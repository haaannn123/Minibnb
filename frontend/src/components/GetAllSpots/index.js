import { fetchSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./GetAllSpots.css";

const GetAllSpots = () => {
  const dispatch = useDispatch();
  const spots = Object.values(useSelector((state) => state.spots.allSpots));

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const getStars = (stars) => {
    if (stars && typeof stars === "number") {
      return stars.toFixed(1);
    } else {
      return stars;
    }
  };

  const getPrice = (price) => {
    if (price && typeof price === "number") {
      return price.toFixed(2);
    } else {
      return price;
    }
  };

  return (
    <div className="spots">
      <div className="cards-container">
        {spots.map((spot) => {
          return (
            <NavLink className="card" key={spot.id} to={`/spots/${spot.id}`} data-tooltip={spot.name}>
              <img src={spot.previewImage} alt="house" className="card-image" />
              <div className="card-location">
                <h3>{`${spot.city}, ${spot.state}`}</h3>
                <div className="stars-container">
                  <i className="fa-sharp fa-solid fa-star star"></i>
                  <h3 className="rating">{spot.avgRating === 0 ? "New" : getStars(spot.avgRating)}</h3>
                </div>
              </div>
              <h4 className="spot-price">{`$${getPrice(spot.price)} night`}</h4>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default GetAllSpots;
