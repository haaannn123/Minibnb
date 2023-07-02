import "./ManageSpots.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import DeleteSpotModal from "../DeleteSpotModal";
import OpenModalButton from "../OpenModelButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ManageSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userSpots = Object.values(useSelector((state) => state.spots.user));

  useEffect(() => {
    dispatch(fetchUserSpots());
  }, [dispatch]);

  if (!userSpots) return null;

  const createSpotButton = () => {
    if (!userSpots.length) {
      return (
        <NavLink to="/spots/new">
          <button>Create a new Spot!</button>
        </NavLink>
      );
    }
  };

  const renderAvgRating = (avgRating) => {
    if (avgRating === 0){
      return 'New'
    } else {
      return avgRating
    }
  }

  const handleClick = (spotId) => {
      history.push(`/spots/${spotId}/edit`)
  }

  return (
    <div className="manage-spots-container">
      <h1>Manage Listings</h1>
      <div className="manage-spots-all-cards">
        {userSpots.length > 0 ? (
          userSpots.map((spot) => {
            return (
              <div className="manage-spots-card" key={spot.id}>
                <NavLink className="manage-spots-navlink" to={`/spots/${spot.id}`}>
                  <img className="manage-spots-image" src={spot.previewImage} alt="house" />
                  <div className="manage-spots-location">
                    <h3 className="manage-spots-city">{`${spot.city}, ${spot.state}`}</h3>
                    <h3 className="manage-spots-rating">
                      <i className="fa-sharp fa-solid fa-star star"></i> {renderAvgRating(spot.avgRating)}
                    </h3>
                  </div>
                  <span className="manage-spots-guests">{spot.guests} {spot.guests === 1 ? "guest" : "guests"}</span>
                  <h4 className="manage-spots-price">{`$${spot.price} night`}</h4>
                </NavLink>
                <button className="manage-spots-update-button" onClick={() => handleClick(spot.id)}>
                  Update Listing
                </button>
                <OpenModalButton
                  className="manage-spots-delete-button"
                  buttonText="Delete Listing"
                  modalComponent={<DeleteSpotModal spotId={spot.id} />}
                />
              </div>
            );
          })
        ) : (
          <span>You don't have any listings! List your home but clicking the "minibnb your home" in the navbar!</span>
        )}
      </div>
    </div>
  );
  
};

export default ManageSpots;
