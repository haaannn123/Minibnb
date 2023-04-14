import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeSpot } from "../../store/spots";
const DeleteReview = ({reviewId}) => {
    const {closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(removeSpot(reviewId))
        .then(closeModal)
    }

    const closeModalSubmit = () => {
        return closeModal;
    }

    return (
        <form onSubmit={(handleSubmit)}>
            <h1>Confirm Delete</h1>
            <h1>Are you sure you want to delete this remove?</h1>
            <button>Yes (Delete Spot)</button>
            <button onClick={closeModalSubmit}>No (Keep Spot)</button>
        </form>
    )
}

export default DeleteReview;
