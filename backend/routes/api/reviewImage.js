const express = require("express");

const router = express.Router();

const { Booking, Spot, SpotImage, Review, ReviewImage, User, sequelize } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

router.delete("/:imageId", requireAuth, async (req, res) => {
  const currentUser = req.user.id;
  const { imageId } = req.params;
  const reviewImage = await ReviewImage.findByPk(imageId);

  if (!reviewImage) {
    res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }

  reviewImage.destroy();

  res.status(200).json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
