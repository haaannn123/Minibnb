const express = require("express");

const { User, Spot } = require("../../db/models");
const router = express.Router();

// Get all Spots
router.get("/", async (req, res) => {
  const allSpots = await Spot.findAll();
  const spotObj = { Spots: allSpots };
  res.status(200).json(spotObj);

//inside a for loop. 
  spotReviews = await Review.findAll({
    where: {
        spotId: req.params.id
    }
});
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
    if (!currentUserSpots.length){
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    } else {
        res.status(200).json(currentUserSpots);
    }
});
module.exports = router;
