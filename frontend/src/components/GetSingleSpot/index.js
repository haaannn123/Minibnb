import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";
import GetSpotReview from "../GetSpotReview";
import OpenModalButton from "../OpenModelButton";
import ReviewModal from "../ReviewModal";
import { fetchReviews } from "../../store/review";

import "./GetSingleSpot.css";
import { Op } from "sequelize";

const GetSingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  //   const reviews = useSelector((state) => state.reviews[spotId]);

  //   useEffect(() => {
  //     dispatch(fetchReviews(spotId))
  // }, [dispatch,spotId]);

  const singleSpot = useSelector((state) => state.spots.singleSpot);
  console.log("SINGLE SPOT:!!!!!", singleSpot.reviews);
  const spotImages = singleSpot.SpotImages;
  const numberReviews = singleSpot.numReviews;
  // console.log
  const checkReviews = (reviews) => {
    if (reviews === 0) {
      return (
        <>
          <i class="fa-sharp fa-solid fa-star"></i>
          <p>New</p>
        </>
      );
    } else {
      return singleSpot.avgStarRating;
    }
  };

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
          <p>{checkReviews(singleSpot.numReviews)}</p>
          <button>Reserve</button>
        </div>
      </div>

      {numberReviews > 0 ? (
        <div>
          {singleSpot.avgStarRating}
          <GetSpotReview />
        </div>
      ) : (
        <div>
          <h1>NEW</h1>
          <OpenModalButton
             buttonText='Post Your Review'
             modalComponent={<ReviewModal spotId={spotId} />}
          />
          <p>Be the first to post a review!</p>
        </div>
      )}
    </>
  );
};
export default GetSingleSpot;
