import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/review";

const GetSpotReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const reviews = Object.values(useSelector((state) => state.reviews));
  console.log("reviews:", reviews);
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

  return (
    <>
      {reviews.map((review) => {
        return (
          <div>
            <h4>{review.User.firstName}</h4>
            <h5>{formattedDate(review.createdAt)}</h5>
          </div>
        );
      })}
    </>
  );
};
export default GetSpotReview;
