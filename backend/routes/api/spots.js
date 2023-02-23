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
    spotObj.previewImg = url;
  }
  spotObj = { Spots: allSpots };
  res.status(200).json(spotObj);
});

// router.get("/", async (req, res) => {
//     const allSpots = await Spot.findAll();
//   //   let returnData = [];
//     for (let spot of allSpots){
//       // let payload = {};
//       let reviewData = await Review.findAll({
//           where: {
//               spotId : spot.id
//           }
//       });
//       // for (let key of spot.dataValues){
//       //     payload[key] = spot[key];
//       // }
//       console.log('JUST ONE SPOT', spot);

//     }
//     const spotObj = { Spots: allSpots };
//     res.status(200).json(spotObj);
//   });

// Get current user Spot
// router.get("/current", async (req, res) => {
//   const { user } = req;
//   const ownerId = user.id;
//     const currentUserSpots = await Spot.findAll({
//         where: {
//             ownerId: ownerId
//         }
//     });
//     if (!currentUserSpots.length){
//         res.json({
//             message: "Spot couldn't be found",
//             statusCode: 404
//         });
//     } else {
//         res.status(200).json(currentUserSpots);
//     }
// });

// router.get('/current', requireAuth, async (req, res) => {
//     const ownerId = req.user.id
//     const spots = await Spot.findAll({
//         where: {
//             ownerId: ownerId
//         },
//     });

//     let avgRating;
//     for (let i = 0; i < spots.length; i++) {
//         const reviewCount = await Review.count({ where: { spotId: spots[i].id } })
//         const sumOfStars = await Review.sum('stars', {
//             where: { spotId: spots[i].id }
//         });

//         if (!sumOfStars) {
//             avgRating = 0;
//         } else {
//             avgRating = (sumOfStars / reviewCount).toFixed(1);
//         }

//         spots[i].avgRating = avgRating;

//         const spotImage = await SpotImage.findOne({
//             where: { spotId: spots[i].id },
//             attributes: ['id', 'url', 'preview']
//         });

//         if (spotImage) spots[i].previewImage = spotImage.url;
//         else spots[i].previewImage = 'No Image Available'

//     }

//     return res.json({ Spots: spots, avgRating})
// });

module.exports = router;
