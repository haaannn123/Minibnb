const express = require("express");

const router = express.Router();

const { Booking, Spot, SpotImage, Review, ReviewImage, User, sequelize } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

router.delete("/:imageId", requireAuth, async (req, res) => {

  const { imageId } = req.params;
  const reviewImage = await ReviewImage.findByPk(imageId);

  if (!reviewImage) {
    res.status(404).json({
      message: "Review Image couldn't be found",
      statusCode: 404,
    });
  }

  const currentUser = req.user.id;
  const review = await Review.findByPk(reviewImage.reviewId)
  if (review.userId === currentUser){
    reviewImage.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    res.status(403).json({
      message: "Forbidden",
      statusCode: 403
  })
  }

});

module.exports = router;
