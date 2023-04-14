import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/review";
import OpenModalButton from "../OpenModelButton";
import DeleteReview from "../DeleteReview";

const GetSpotReview = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const allReviews = Object.values(useSelector((state) => state.reviews.spot))
  const reviews = Object.values(useSelector((state) => state.reviews.spot));
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
        console.log("review", review)
        return (
          <div>
             <h4>{review.User.firstName}</h4>
             <h5>{formattedDate(review)}</h5>
             <h5>{review.review}</h5>
         </div>
        );
      })}
      <OpenModalButton
      buttonText="Delete"
      modalComponent={<DeleteReview  reviewIdd={allReviews.id}/>}
      />
    </>
  );
};
export default GetSpotReview;
