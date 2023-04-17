import "./DeleteSpotModal.css";
import { useModal } from "../../context/Modal";
import { removeSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const DeleteSpotModal = ({ spotId }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory;

  const handleSubmit = () => {
    dispatch(removeSpot(spotId)).then(closeModal);
  };

  const closeModalSubmit = (e) => {
    e.preventDefault();
    return closeModal();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Confirm Delete</h1>
      <h1>Are you sure you want to remove this spot from the listings?</h1>
      <button className="delete-spot-button" type="submit">
        Yes (Delete Spot)
      </button>
      <button className="cancle-delete-button" onClick={closeModalSubmit}>
        No (Keep Spot)
      </button>
    </form>
  );
};

export default DeleteSpotModal;
