import { useState } from 'react';
import OpenModalButton from '../OpenModelButton';
import "./ChangeReservationModal.css"
import { useDispatch } from 'react-redux';
import DeleteBookings from '../DeleteBooking';
import { thunkUpdateBookings } from '../../store/bookings';

const ChangeReservationModal = ({startDate, endDate, guests, maxGuests, bookingId}) => {

    const dispatch = useDispatch();
    const [startDateVal, setStartDateVal] = useState(startDate);
    const [endDateVal, setEndDateVal] = useState(endDate);
    const [guestsVal, setGuestsVal] = useState(guests);

    const handleSubmit = () => {

        const new_booking = {
            startDate: startDateVal,
            endDate: endDateVal,
            numberOfGuests: guestsVal
        }
        dispatch(thunkUpdateBookings(bookingId, new_booking))
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="reservation-modal">
                <h2>Reservation Details</h2>
                <span>Dates</span>
                <div className="reservation-checks-container">
                    <div className="reservation-checkin-container">
                        <label for="bookings-checkin" className="reservation-checkin-label">Check in</label>
                        <input 
                            className="reservation-checkin"
                            type="date"
                            id="bookings-checkin"
                            value={startDateVal}
                            onChange={(e) => setStartDateVal(e.target.value)}
                        />
                    </div>
                    <div className="reservation-checkout-container">
                        <label for="bookings-checkout" className="reservation-checkout-label">Check out</label>
                        <input 
                            className="reservation-checkout"
                            type="date"
                            id="bookings-checkout"
                            value={endDateVal}
                            onChange={(e)=> setEndDateVal(e.target.value)}
                        />
                    </div>
                </div>
                <label for="bookings-guest-input">Guests</label>
                <input 
                    className="guest-input"
                    id="bookings-guest-input"
                    // placeholder={guestsVal}
                    value={guestsVal}
                    onChange={(e)=> setGuestsVal(e.target.value)}
                    max={maxGuests}
                    min="1"
                    type="number"/>
                <h2>Cancellation Policy</h2>
                <p className="cancellation-paragraph">Accomodation and service fee for the first 30 nights are non-refundable. Cancel before check-in and get back the cleaning fee, if you paid one.</p>
                <button className="change-reservation-button" type="submit">Change</button>
                <OpenModalButton 
                    className="delete-reservation-button"
                    buttonText="cancel reservation"
                    modalComponent={<DeleteBookings bookingId={bookingId}/>}/>
            </div>
        </form>
    )

}

export default ChangeReservationModal;
