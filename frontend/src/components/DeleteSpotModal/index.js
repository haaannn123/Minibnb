import "./DeleteSpotModal.css";
import { useModal } from "../../context/Modal";
import { fetchUserSpots, removeSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const DeleteSpotModal = ({ spotId }) => {

  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = () => {

    dispatch(removeSpot(spotId))
    dispatch(fetchUserSpots())
    closeModal();

  };

  return (
    <form  className="delete-spot-modal-container"onSubmit={handleSubmit}>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to remove this spot from the listings?</h3>
      <button className="delete-spot-button" type="submit">
        Yes (Delete Spot)
      </button>
      <button className="spot-cancel-delete-button" onClick={closeModal}>
        No (Keep Spot)
      </button>
    </form>
  );
};

export default DeleteSpotModal;
