import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";
import GetSpotReview from "../GetSpotReview";
import "./GetSingleSpot.css";

const GetSingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const singleSpot = useSelector((state) => state.spots.singleSpot);
  console.log("SINGLE SPOT:!!!!!", singleSpot)
  const spotImages = singleSpot.SpotImages;
  const checkReviews = (reviews) => {
      if (reviews === 0) {
        return "New"
      } else {
        return singleSpot.avgStarRating;
      }
  }

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

    if (!singleSpot) return null;
    if (!spotImages) return null;
  return (
    <>
      <div>
        <div>
            <h3>{singleSpot.name}</h3>
            <h4>
              {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
            </h4>
            {spotImages.map((obj) => {
              return <img src={obj.url} alt="cottage house" className="spot-image" />;
            })}
            <h3>
              Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}
            </h3>
            <h4>{singleSpot.description}</h4>
        </div>
        <div className="info-box">
            <p>${singleSpot.price} night</p>
            <p>
              <i className="fa-sharp fa-solid fa-star"></i>
              {checkReviews(singleSpot.numReviews)}
            </p>
              <button>Reserve</button>
        </div>
      </div>
      {checkReviews(singleSpot.numReviews)}
      <GetSpotReview />
    </>
  );
};
export default GetSingleSpot;
