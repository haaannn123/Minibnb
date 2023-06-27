import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import "./DeleteBookings.css"
import { thunkDeleteBooking } from "../../store/bookings";

const DeleteBookings = ({bookingId}) => {

    const dispatch = useDispatch()
    const {closeModal} = useModal();

    const handleNoClick = () => {
        closeModal()
    }

    const handleYesClick = () => {
        dispatch(thunkDeleteBooking(bookingId))
        closeModal()
    }


    return (
        <div className="delete-bookings-container">
            <h1>Are you sure you want to delete this reservation?</h1>
            <button className="delete-bookings-button" onClick={handleYesClick}>Yes, cancel this reservation</button>
            <button className="delete-cancel-reservation-button"onClick={handleNoClick}>No, keep this reservation</button>
        </div>
    )
}

export default DeleteBookings