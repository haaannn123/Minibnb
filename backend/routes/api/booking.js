const express = require("express");

const { User, Spot, Review, ReviewImage, SpotImage , Booking} = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const {Op} = require('sequelize');

router.get('/current', requireAuth, async (req, res) => {
      const allBookings = await Booking.findAll({
        where: {
          userId: req.user.id
        },
        include: [
          {
            model: Spot,
            attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price','guests','bedrooms','beds', 'bath'],
            include: [SpotImage]
          }
        ]
      });
  
      const spots = allBookings.reduce((spotsArr, booking) => {
        const spotData = booking.Spot.toJSON();
        spotData.previewImage = null;
  
        spotData.SpotImages.forEach(image => {
          if (image.preview) {
            spotData.previewImage = image.url;
          }
        });
  
        return [...spotsArr, spotData];
      }, []);
  
      const bookingData = allBookings.map(booking => ({
        ...booking.toJSON(),
        Spot: spots.find(spot => spot.id === booking.Spot.id)
      }));
  
      const bookings = { Bookings: bookingData };
      res.status(200).json(bookings);
  });

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

    if (!booking){
        res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }


    let spot = await Spot.findByPk(booking.spotId);
    if (booking.userId !== currentUser && spot.ownerId !== currentUser) {
        return res.status(403).json({
            message: "Forbidden: Cannot delete booking if you are not the spot owner or booking owner",
            statusCode: 403
        });
    };


    await booking.destroy();
    res.status(200).json({
      message: "Successfully deleted",
      statusCode: 200,
    });
});



module.exports = router;
