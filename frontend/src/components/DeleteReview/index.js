import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { removeReviews} from "../../store/review";
import { useHistory } from "react-router-dom";
const DeleteReview = ({reviewId, spotId}) => {
    const {closeModal } = useModal();
    console.log("REVIEWID:", reviewId);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        dispatch(removeReviews(reviewId))
        .then(closeModal)
    }

    const closeModalSubmit = () => {
        return closeModal;
    }

    return (
        <form onSubmit={(handleSubmit)}>
            <h1>Confirm Delete</h1>
            <h1>Are you sure you want to delete this review?</h1>
            <button>Yes (Delete Review)</button>
            <button onClick={closeModalSubmit}>No (Keep Review)</button>
        </form>
    )
}

export default DeleteReview;
