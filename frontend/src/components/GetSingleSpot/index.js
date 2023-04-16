import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";
import GetSpotReview from "../GetSpotReview";
import OpenModalButton from "../OpenModelButton";
import ReviewModal from "../ReviewModal";
import "./GetSingleSpot.css";

const GetSingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const singleSpot = useSelector((state) => state.spots.singleSpot);
  const allReviews = Object.values(useSelector((state) => state.reviews.spot));
  let userReview;
  for (let reviewObj of allReviews) {
    userReview = reviewObj.userId;
  }
  const spotImages = singleSpot.SpotImages;
  const numberReviews = singleSpot.numReviews;

  const checkReviews = (reviews) => {
    if (reviews === 0) {
      return (
        <>
          <i class="fa-sharp fa-solid fa-star"></i>
          <p>New</p>
        </>
      );
    } else {
      return (
        <>
          <i class="fa-sharp fa-solid fa-star"></i>
          <p>{singleSpot.avgStarRating}</p>
          <div>·</div>
          <h4>{numberReviews > 1 ? `${numberReviews} reviews` : `${numberReviews} review`}</h4>
        </>
      );
    }
  };

  const ifUser = () => {
    if (sessionUser && sessionUser.id !== singleSpot.ownerId && userReview !== sessionUser.id) {
      return <OpenModalButton buttonText="Post Your Review" modalComponent={<ReviewModal spotId={spotId} />} />;
    }
  };
  // !objReviews.includes(sessionUser.id)

  const reviewHeader = () => {
    if (numberReviews === 0) {
      return (
        <div>
          <i class="fa-sharp fa-solid fa-star"></i>
          <h3>New</h3>
        </div>
      );
    } else {
      return (
        <div>
          <i class="fa-sharp fa-solid fa-star"></i>
          <h4>{singleSpot.avgStarRating}</h4>
          <h4>{numberReviews > 1 ? `${numberReviews} reviews` : `${numberReviews} review`}</h4>
        </div>
      );
    }
  };

  const renderReviews = () => {
    if (numberReviews === 0) {
      return <h4>Be the first to Post a Review!</h4>;
    } else {
      return <GetSpotReview />;
    }
  };

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  if (!singleSpot) return null;
  if (!spotImages) return null;
  if (!singleSpot.Owner) return null;
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
        </div >
        <div className="information-container">
          <div className="under-details">
          <h3>
            Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}
          </h3>
          <h4>{singleSpot.description}</h4>
          </div>
          <div className="info-box">
            <p>${singleSpot.price} night</p>
            <p>{checkReviews(singleSpot.numReviews)}</p>
            <button onClick={() => window.alert("Feature coming soon!")}>Reserve</button>
          </div>
        </div>
      </div>
      {reviewHeader()}
      {ifUser()}
      {renderReviews()}
    </>
  );
};
export default GetSingleSpot;
