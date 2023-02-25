const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage , Booking} = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {Op} = require('sequelize');

router.get('/current', requireAuth, async (req, res) => {
    const currentUser = req.user.id;
    const allBookings = await Booking.findAll({
        where: {
            userId: currentUser
        }
    });
    let booking;
    for (let obj of allBookings){
        booking = obj.dataValues


        const allSpots = await Spot.findAll({
            where: {
                ownerId: currentUser
            },
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price']
        })
        let spot;
        for (let obj of allSpots){
            spot = obj.dataValues;


            const spotImages = await SpotImage.findAll({
                where: {
                    spotId: currentUser
                }
            })
            let url;
            for (let obj of spotImages){
                url = obj.url
            }

            spot.previewImage = url
        }

        booking.Spot = allSpots

    }

    const bookings = {Bookings: allBookings};
    res.status(200).json(bookings);
})

// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate} = req.body
    const currentUser = req.user.id;
    const bookings = await Booking.findByPk(bookingId);

    // if the booking doesn't exist
    if (!bookings){
        res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    // booking must belong to current user
    if (currentUser === bookings.userId){
        bookings.update(req.body);
    }
});

module.exports = router;
