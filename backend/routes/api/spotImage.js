const express = require('express');

const router = express.Router();

const { Booking, Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const currUser = req.user.id;
    const { imageId } = req.params
    let spotImage = await SpotImage.findByPk(imageId);

    if (!spotImage) {
        res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    }

    const spot = await Spot.findByPk(spotImage.spotId);
    if (spot.ownerId === currUser) {
        spotImage.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
});


module.exports = router;
