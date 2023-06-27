import { useEffect } from 'react';
import './ChangeReservationModal.css';
import { useDispatch } from 'react-redux';
import { thunkGetUserBookings } from '../../store/bookings';
import OpenModalButton from '../OpenModelButton';

const ChangeReservationModal = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetUserBookings())
    }, [dispatch])

    return(
        <form>
            <div className="reservation-modal">
                <h2>Reservation Details</h2>
                <span>Dates</span>
                <div className="reservation-checks-container">
                    <div className="reservation-checkin-container">
                        <label className="reservation-checkin-label">Check in</label>
                        <input 
                            className="reservation-checkin"
                            type="date"
                        />
                    </div>
                    <div className="reservation-checkout-container">
                        <label className="reservation-checkout-label">Check out</label>
                        <input 
                            className="reservation-checkout"
                            type="date"
                        />
                    </div>
                </div>
                <label>Guests</label>
                <input 
                    className="guest-input"
                    type="number"/>
                <h2>Cancellation Policy</h2>
                <p className="cancellation-paragraph">Accomodation and service fee for the first 30 nights are non-refundable. Cancel before check-in and get back the cleaning fee, if you paid one.</p>
                <button className="change-reservation-button">Change</button>
                <OpenModalButton 
                    className="delete-reservation-button"
                    buttonText="cancel reservation"/>
            </div>
        </form>
    )

}

export default ChangeReservationModal;
