const express = require('express');

const { User, Spot, Review, ReviewImage, SpotImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { validateSpot, validateReview } = require("../../utils/validation");
const { Op } = require("sequelize");

// Search for all the spots with the city
router.get('/:query', async (req, res) => {
    const { query } = req.params;
  
    let spots = await Spot.findAll({
      where: {
        [Op.or]: [
          { city: { [Op.iLike]: `%${query}%` } },
          { state: { [Op.iLike]: `%${query}%` } },
          { country: { [Op.iLike]: `%${query}%` } }
        ]
      }
    })

    let spot;
  for (let spotObj of spots) {
    spot = spotObj.dataValues;
    
    
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
  } 
  
    if (spots){
        res.status(200).json({ Spots: spots});
    } else {
        return res.status(404).json({message: "Results not found, nothing nada"})
    }

  });

module.exports= router;

  
  
  
  
  
  