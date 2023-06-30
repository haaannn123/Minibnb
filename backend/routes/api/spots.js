const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { validateSpot, validateReview } = require("../../utils/validation");
const { Op } = require("sequelize");
// Get all Spots
router.get("/", async (req, res) => {
  let { page, size } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  const pagination = {};

  if (!page) page = 1;
  if (!size) size = 20;

  if (page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1);
  } else {
    if (isNaN(page) || !Number.isInteger(page) || page < 1 || page > 10) {
      res.status(400).json({
        message: "Validation Error",
        statusCode: 400,
        error: {
          page: "Page must be greater than or equal to 1",
        },
      });
    }
    if (isNaN(size) || !Number.isInteger(size) || size < 1 || size > 20) {
      res.status(400).json({
        message: "Validation Error",
        statusCode: 400,
        error: {
          size: "Size must be an integer greater than or equal to 1 and less than or equal to 20",
        },
      });
    }
  }

  const allSpots = await Spot.findAll({ ...pagination });

  let spot;
  for (let spotObj of allSpots) {
    spot = spotObj.dataValues;

    // find the average rating of all stars
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id,
      },
    });
    let sumOfStars = 0;
    let count = 0;
    let avg = 0;
    for (const reviewObj of reviews) {
      sumOfStars += reviewObj.stars;
      count++;
      avg = sumOfStars / count;
    }
    spot.avgRating = avg;

    const spotImage = await SpotImage.findAll({
      where: {
        spotId: spot.id,
      },
    });
    // let url;

    // for (let obj of spotImage) {
    //   url = obj.url;
    // }

    const image = await SpotImage.findOne({
      where:{
        spotId: spot.id,
        preview: true
      }
    })

    if (!image){
      spot.previewImage = null;
    } else {
      spot.previewImage = image.url
    }

    // if (url) {
    //   spot.previewImage = url;
    // } else {
    //   spot.previewImage = null;
    // }
  }

  res.status(200).json({
    Spots: allSpots,
    page: page,
    size: size,
  });
});

// Get current user Spot
router.get("/current", async (req, res) => {
  const { user } = req;
  const ownerId = user.id;
  const currentUserSpots = await Spot.findAll({
    where: {
      ownerId: ownerId,
    },
  });

  let spotObj;
  for (let spot of currentUserSpots) {
    spotObj = spot.dataValues;
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id,
      },
    });

    let star = 0;
    let count = 0;
    let avg = 0;
    for (let reviewObj of reviews) {
      star += reviewObj.stars;
      count++;
      avg = star / count;
    }

    spotObj.avgRating = avg;

    const spotImage = await SpotImage.findAll({
      where: {
        spotId: spot.id,
      },
    });
    let url;
    for (let obj of spotImage) {
      url = obj.url;
    }
    spotObj.previewImage = url;
  }

  if (!currentUserSpots.length) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  } else {
    let currUserSpotObj = { Spots: currentUserSpots };
    res.status(200).json(currUserSpotObj);
  }
});

// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId); // NOT ITERABLE

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }
  let newSpot = spot.toJSON(); // ITERABLE

  let review = await Review.findAll({
    where: {
      spotId: spot.id,
    },
  });

  let sumOfAllStars = 0;
  let count = 0;
  let avg = 0;
  for (let reviewObj of review) {
    let values = reviewObj.dataValues;
    sumOfAllStars += values.stars;
    count++;
    avg = sumOfAllStars / count;
  }

  const images = await SpotImage.findAll({
    where: { spotId },
    attributes: ["id", "url", "preview"],
  });

  const owner = await User.findOne({
    where: {
      id: spot.ownerId,
    },
    attributes: ["id", "firstName", "lastName"],
  });

  newSpot.numReviews = count;
  newSpot.avgStarRating = avg;
  newSpot.SpotImages = images;
  newSpot.Owner = owner;
  res.status(200).json(newSpot);
});

// Create a spot
router.post("/", requireAuth, validateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;
  const newSpot = await Spot.create({ ownerId, ...req.body });
  if (newSpot) {
    res.status(201).json(newSpot);
  };
});

// Add an image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res) => {
  const currentUser = req.user.id;
  const { url, preview } = req.body;
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (currentUser !== spot.ownerId) {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

    const newImage = await SpotImage.create({ spotId, ...req.body });
    res.status(200).json(newImage);
  
});

// Edit a spot
router.put("/:spotId", requireAuth, validateSpot, async (req, res) => {
  const currentUser = req.user.id;
  const { spotId } = req.params;
  const { address, city, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.findByPk(spotId);

  // if the spot doesn't exist
  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (currentUser === spot.dataValues.ownerId) {
    spot.update(req.body);
    res.status(200).json(spot);
  } else {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Deletes an existing spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const ownerId = spot.ownerId;

  if (userId === ownerId) {
    spot.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

// Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;
  const spot = await Spot.findByPk(spotId);

  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  const reviews = await Review.findAll({
    where: {
      spotId: spotId,
    },
  });
  let review;
  for (let obj of reviews) {
    review = obj.dataValues;

    const users = await User.findAll({
      where: {
        id: review.userId,
      },
      attributes: ["id", "firstName", "lastName"],
    });

    let user;
    for (let obj of users) {
      user = obj.dataValues;
    }
    review.User = user;

    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: spotId,
      },
      attributes: ["id", "url"],
    });

    review.ReviewImages = reviewImages;
  }

  const allReviews = { Review: reviews };
  res.status(200).json(allReviews);
});

// Create and return a new review for a spot specified by id
router.post("/:spotId/reviews", requireAuth, validateReview, async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);

  // if there is not a spot
  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  // if review for spot already exists
  const reviews = await Review.findOne({
    where: {
      userId: userId,
      spotId: spotId,
    },
  });

  if (reviews) {
    res.status(403).json({
      message: "User already has a review for this spot",
      statusCode: 403,
    });
  } else {
    const newReview = await Review.create({ spotId, userId, ...req.body });

    if (newReview) {
      res.status(201).json(newReview);
    }
  }
});

// GET all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);

  // Couldn't find a spot specified by it's id
  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  // Not the owner
  if (userId !== spot.ownerId) {
    const regularBookings = await Booking.findAll({
      where: {
        spotId: spotId,
      },
      attributes: ["spotId", "startDate", "endDate"],
    });
    res.status(200).json(regularBookings);
  } else {
    const ownerBookings = await Booking.findAll({
      where: {
        spotId: spotId,
      },
    });
    let bookings;
    for (let obj of ownerBookings) {
      bookings = obj.dataValues;

      const user = await User.findAll({
        where: {
          id: userId,
        },
      });
      bookings.User = user;
    }

    let ownerBook = { Bookings: ownerBookings };
    res.status(200).json(ownerBook);
  }
});

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id;
  const spot = await Spot.findByPk(spotId);

  // if the spot doesn't exist
  if (!spot) {
    res.status(404).json({
      message: "Spot couldn't be found",
      statusCode: 404,
    });
  }

  if (spot.ownerId === userId) {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  // EndDate must not come before startDate;
  let startTime = new Date(startDate).getTime();
  let endTime = new Date(endDate).getTime();

  if (endTime <= startTime) {
    res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }

  //  booking conflicts
  const bookings = await Booking.findAll({
    where: {
      spotId: spotId,
      startDate: { [Op.lte]: endDate },
      endDate: { [Op.gte]: startDate },
    },
  });

  if (bookings.length >= 1) {
    res.status(403);
    return res.json({
      message: "Sorry, this spot is already booked for the specified dates",
      statusCode: 403,
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    });
  }
  const newBooking = await Booking.create({ userId, spotId, ...req.body });
  res.json(newBooking);
});

module.exports = router;
