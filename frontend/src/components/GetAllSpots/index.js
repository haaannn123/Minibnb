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
      <div className="all-spots-container">
        {spots.map((spot) => {
          return (
            <div className="all-spots-card">
              <NavLink className="all-spots-navlink" to={`/spots/${spot.id}`}>
              <img src={spot.previewImage} alt="house" className="all-spots-card-image" />
              <div className="all-spots-card-details">
                  <h3 className="all-spots-city">{`${spot.city}, ${spot.state}`}</h3>
                  <h3 className="rating"><i className="fa-sharp fa-solid fa-star star all-spots-star"></i>{spot.avgRating === 0 ? "New" : getStars(spot.avgRating)}</h3>
              </div>
              <span className="all-spots-guests">{spot.guests} {spot.guests === 1? "guest": "guests"}</span>
              <h4 className="all-spots-price">{`$${getPrice(spot.price)} night`}</h4>
              </NavLink>
            </div>
          );
        })}
    </div>
  );
};

export default GetAllSpots;
