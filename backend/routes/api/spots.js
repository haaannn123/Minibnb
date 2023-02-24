const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { validateSpot, validateReview } = require("../../utils/validation")
// Get all Spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll();

  let spotObj;
  for (let spot of allSpots) {
    spotObj = spot.dataValues;
    const reviews = await Review.findAll({
      where: {
        spotId: spot.id,
      },
    });

    let starReview = 0;
    let count = 0;
    let avg = 0;
    if (!reviews.length) {
      avg = 0;
    } else {
      for (let reviewObj of reviews) {
        starReview += reviewObj.stars;
        count++;
      }
      avg = starReview / count;
    }
    spotObj.avgRating = avg;

    const spotImg = await SpotImage.findAll({
      where: {
        spotId: spot.id,
      },
    });

    let url;
    for (let obj of spotImg) {
      url = obj.url;
    }
    spotObj.previewImage = url;
  }
  spotObj = { Spots: allSpots };
  res.status(200).json(spotObj);
});


// Get current user Spot
router.get("/current", async (req, res) => {
  const { user } = req;
  const ownerId = user.id;
    const currentUserSpots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    });

    let spotObj;
    for (let spot of currentUserSpots){
        spotObj = spot.dataValues;
        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
        });

        let star = 0;
        let count = 0;
        let avg = 0;
        for (let reviewObj of reviews){
            star += reviewObj.stars;
            count ++;
            avg = star / count
        }

        spotObj.avgRating = avg;


        const spotImage = await SpotImage.findAll({
            where: {
                spotId: spot.id
            }
        });
        let url;
        for (let obj of spotImage){
            url = obj.url
        }
        spotObj.previewImage = url;
    };

    if (!currentUserSpots.length){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    } else {
        let currUserSpotObj = { Spots: currentUserSpots};
        res.status(200).json(currUserSpotObj);
    };
});



// Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId); // NOT ITERABLE

    if (!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    let newSpot = spot.toJSON(); // ITERABLE

    let review = await Review.findAll({
        where: {
            spotId: spot.id
        }
    });

    let sumOfAllStars = 0;
    let count = 0;
    let avg = 0;
    for (let reviewObj of review){
        let values = reviewObj.dataValues;
        sumOfAllStars += values.stars
        count ++;
        avg = sumOfAllStars / count;
    }

    const images = await SpotImage.findAll({
        where: { spotId },
        attributes: ['id', 'url', 'preview']
    })

    const owner = await User.findOne({
        where: {
            id: spot.ownerId
        },
        attributes: ['id', 'firstName', 'lastName']
    });
    console.log(owner)

    newSpot.numReviews = count;
    newSpot.avgStarRating = avg;
    newSpot.SpotImages = images;
    newSpot.Owner = owner;
    res.status(200).json(newSpot);
});


// Create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const {address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;
    const newSpot = await Spot.create({ownerId, ...req.body});
    if (newSpot){
        res.status(201).json(newSpot);
    }
});


// Add an image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId);
    if (!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };
    const newImage = await SpotImage.create({spotId, ...req.body})
    res.status(200).json(newImage)
});


// Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const currentUser = req.user.id;
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    // if the spot doesn't exist
    if (!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };

    if (currentUser === spot.dataValues.ownerId){
         spot.update(req.body);
        res.status(200).json(spot)
    } else {
        res.json({
            message: "Spot must belong to current user",
            statusCode: 403
        })
    }
})


// Deletes an existing spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const userId = req.user.id;
    const spot = await Spot.findByPk(spotId);
    const ownerId = spot.ownerId

    if (!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    if (userId === ownerId){
        spot.destroy();
        return res
            .status(200)
            .json({
                message: "Successfully deleted",
                statusCode: 200
            });
    }
});



// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        }
    });
    let review;
    for (let obj of reviews){
        review = obj.dataValues

        const users = await User.findAll({
            where: {
                id : spotId
            },
            attributes: ['id', 'firstName', 'lastName']
        });

        let user;
        for (let obj of users) {
            user = obj.dataValues;
        }
        review.User = user;


        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId : spotId
            },
            attributes: ['id', 'url']
        })

        review.ReviewImages = reviewImages
    }

    const allReviews = {Review: reviews}
    res.status(200).json(allReviews);
})


// Create and return a new review for a spot specified by id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { spotId } = req.params;
    const {review, stars} = req.body
    const currentUser = req.user.id;
    const spot = await Spot.findByPk(spotId);

    // if there is not a spot
    if (!spot){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // if spot already exists
    const spotReview = await Review.findAll({
        where: {
            spotId: spotId
        }
    });

    for (let obj of spotReview){
        let reviewId = obj.dataValues.userId
        if (currentUser === reviewId){
            res.json({
                message: "User already has a review for this spot"
            })
        }
    }
    const newReview = await Review.create({spotId, ...req.body})

    if (newReview){
    res.status(201).json(newReview);
    }
});




module.exports = router;
