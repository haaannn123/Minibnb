const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

// Get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId : currentUser
        }
    }); // can't manipulate this

    let reviewObj;
    for (let review of reviews){
    // this allows us to manipulate the keys inside reviews.
        reviewObj = review.dataValues


        const user = await User.findAll({
            where: {
                id: review.id
            },
            attributes: ['id', 'firstName', 'lastName']
        });
        let userDataValues;
        for (let use of user){
            userDataValues = use.dataValues
        }
        reviewObj.User = userDataValues;


        const spot = await Spot.findAll({
            where: {
                ownerId: currentUser
            }
        })
        let spotValues;
        for (let values of spot){
            spotValues = values.dataValues

            reviewObj.Spot = spotValues;

            const spotImage = await SpotImage.findAll({
                where: {
                    spotId: currentUser
                }
            });
            let url;
            for (let key of spotImage){
                url = key.url
            }
            spotValues.previewImage = url;


            const imageReviews = await ReviewImage.findAll({
                where: {
                    reviewId: currentUser
                },
                attributes: ['id', 'url']
            })
            reviewObj.ReviewImages = imageReviews
        }

    }

    const someObj = {Reviews: reviews}
    res.status(200).json(someObj);
});






module.exports = router;
