import "./ManageSpots.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../OpenModelButton";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const userSpots = Object.values(useSelector((state) => state.spots.user))
  const sessionUser = useSelector((state) => state.session.user.id);

  useEffect(() => {
    dispatch(fetchUserSpots());
  }, [dispatch]);

  const createSpotButton = () => {
    if (!userSpots.length) {
      return (
        <NavLink to="/spots/new">
          <button>Create a new Spot!</button>
        </NavLink>
      );
    }
  };

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
        {createSpotButton()}
        {userSpots.map((spot) => {
        return (
          <NavLink to={`/spots/${spot.id}`}>
          <div>
            <img src={spot.previewImage} alt="house"></img>
            <h3>{`${spot.city}, ${spot.state}`}</h3>
            <div className="stars-container">
              <i className="fa-sharp fa-solid fa-star star"></i>
              <h3 className="rating">{spot.avgRating}</h3>
            </div>
            <h4 className="spot-price">{`$${spot.price} night`}</h4>
            <NavLink to={`/spots/${spot.id}/edit`}>
              <button>Update</button>
            </NavLink>
            <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpotModal spotId={spot.id} />}></OpenModalButton>
          </div>
          </NavLink>
        );
      })}
      </div>
    </>
  );
};

export default ManageSpots;
