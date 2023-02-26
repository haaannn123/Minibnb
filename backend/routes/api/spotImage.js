const express = require('express');

const router = express.Router();

const { Booking, Spot, SpotImage, Review, ReviewImage, User, sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params
    let spotImage = await SpotImage.findByPk(imageId);

    if (!spotImage) {
        res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    }

    const userId = req.user.id;
    const spot = await Spot.findByPk(spotImage.spotId);
    if (spot.ownerId === userId) {
        spotImage.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });
    } else {
        res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }
});

module.exports = router;
