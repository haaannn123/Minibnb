import "./ManageSpots.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
const ManageSpots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spots.user));
  console.log("All SPOTS HERE!!:", spots);

  useEffect(() => {
    dispatch(fetchUserSpots());
  }, [dispatch]);

  return (
    <>
      <div>
        <h1>Manage Your Spots</h1>
        <button>Create a New Spot</button>
        {spots.map((spot) => {
          return (
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
                <button>Delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ManageSpots;
