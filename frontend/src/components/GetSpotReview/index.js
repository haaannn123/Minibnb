import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/review";
import OpenModalButton from "../OpenModelButton";
import DeleteReview from "../DeleteReview";
import "./GetSpotReviews.css"

const GetSpotReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const reviews = Object.values(useSelector((state) => state.reviews.spot)).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  useEffect(() => {
    dispatch(fetchReviews(spotId));
  }, [dispatch, spotId]);

  if (!reviews) return null;

  const formattedDate = (review) => {
    return new Date(review.createdAt).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const deleteButtonReview = (review) => {
    if (sessionUser && sessionUser.id === review.userId) {
      return <OpenModalButton className="review-delete-button-here"buttonText="Delete" modalComponent={<DeleteReview reviewId={review.id} spotId={spotId} />} />;
    }
  };

  return (
    <>
      {reviews.map((review) => {
        return (
          <div key={review.id}>
            <h4>{review.User.firstName}</h4>
            <h5>{formattedDate(review)}</h5>
            <h5>{review.review}</h5>
            {deleteButtonReview(review)}
          </div>
        );
      })}
    </>
  );
};
export default GetSpotReview;
