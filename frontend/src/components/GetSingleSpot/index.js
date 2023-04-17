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

  const getStars = (stars) => {
    if (stars && typeof stars === "number") {
      return stars.toFixed(1);
    } else {
      return null;
    }
  };

  const getPrice = (price) => {
    if (price && typeof price === "number") {
      return price.toFixed(2);
    } else {
      return null;
    }
  };

  const checkReviews = (reviews) => {
    if (reviews === 0) {
      return (
        <div className="review-info">
          <i class="fa-sharp fa-solid fa-star"></i>
          <p>New</p>
        </div>
      );
    } else {
      return (
        <div className="review-info">
          <i class="fa-sharp fa-solid fa-star"></i>
          <p>{getStars(singleSpot.avgStarRating)}</p>
          <div className="centered-dot">·</div>
          <h4>{numberReviews > 1 ? `${numberReviews} Reviews` : `${numberReviews} Review`}</h4>
        </div>
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
        <div className="reviews-header">
          <i class="fa-sharp fa-solid fa-star"></i>
          <h3>New</h3>
        </div>
      );
    } else {
      return (
        <div className="reviews-header">
          <i class="fa-sharp fa-solid fa-star"></i>
          <h4>{getStars(singleSpot?.avgStarRating)}</h4>
          <div className="centered-dot">·</div>
          <h4>{numberReviews > 1 ? `${numberReviews} Reviews` : `${numberReviews} Review`}</h4>
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
      <div className="spot-details-container">
        <h3>{singleSpot.name}</h3>
        <h4>
          {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
        </h4>
        {spotImages.map((obj) => {
          return (
            <div className="spot-images-container">
              <img src={obj.url} alt="cottage house" className="preview-image" />
              <div className="four-images">
                <div className="four-images-subset">
                  <img src="https://i.imgur.com/zuH81uv.png" alt="coming soon..." className="image-coming"></img>
                  <img src="https://i.imgur.com/zuH81uv.png" alt="coming soon..." className="image-coming"></img>
                </div>
                <div className="four-images-subset">
                  <img src="https://i.imgur.com/zuH81uv.png" alt="coming soon..." className="image-coming"></img>
                  <img src="https://i.imgur.com/zuH81uv.png" alt="coming soon..." className="image-coming"></img>
                </div>
              </div>
            </div>
          );
        })}
        <div className="single-spot-details">
          <div className="single-spot-details-info">
            <h3>
              Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}
            </h3>
            <h4>{singleSpot.description}</h4>
          </div>
          <div className="single-spot-reservation">
            <div className="single-spot-reservation-info">
              <div className="single-spot-price-container">
                <p className="single-spot-price">${getPrice(singleSpot.price)}</p>
                <p>night</p>
              </div>
              <p>{checkReviews(singleSpot.numReviews)}</p>
            </div>
            <button className="reserve-button" onClick={() => window.alert("Feature coming soon!")}>
              Reserve
            </button>
          </div>
        </div>
        <div className="reviews-section-container">
          {reviewHeader()}
          {ifUser()}
          {renderReviews()}
        </div>
      </div>
    </>
  );
};
export default GetSingleSpot;
