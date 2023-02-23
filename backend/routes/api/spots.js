const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

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
router.post('/', requireAuth, async (req, res) => {

})
module.exports = router;
