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

    // checking conflicts
    const bookingsConflicts = await Booking.findAll({
        where: {
          spotId: bookings.spotId,
          startDate: { [Op.lte]: endDate },
          endDate: { [Op.gte]: startDate },
        },
      });

      let startDateConflicts = false;
      let endDateConflicts = false;

      for (let booking of bookingsConflicts){
        if (booking.endDate >= startDate){
            startDateConflicts = true;
        }
        if (booking.startDate <= endDate){
            endDateConflicts = true;
        }
      }

      if (startDateConflicts){
        res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            error: {
                startDate: "Start date conflicts with an existing booking"
            }
        })
      }
      if (endDateConflicts){
        res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                endDate: "End date conflicts with an existing booking"
            }
        })
      }


      // past bookings can't be modified
      if (bookings.endDate < Date.now()){
        res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
      };

      if (endDate < startDate){
        res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate",
              }
        })
      }

      bookings.update(req.body);
      res.status(200).json(bookings)
});


router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const currentUser = req.user.id;
    const booking = await Booking.findByPk(bookingId);
    const userId = booking.userId;
    if (!booking){
        res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    if (currentUser === userId){
        booking.destroy();
        res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
});



module.exports = router;
