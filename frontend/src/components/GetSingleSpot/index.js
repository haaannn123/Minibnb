import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";
import GetSpotReview from '../GetSpotReview'

const GetSingleSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const singleSpot = useSelector((state) => state.spots.singleSpot);
  const spotImages = singleSpot.SpotImages;

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  if (!singleSpot) return null;
  if (!spotImages) return null;

  return (
    <>
    <div>
      <h3>{singleSpot.name}</h3>
      <h4>
        {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
      </h4>
      {spotImages.map((obj) => {
        return <img src={obj.url} alt="this will render something"/>;
      })}
      <h3>
        Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName}
      </h3>
      <h4>{singleSpot.description}</h4>
      <div>
        <p>${singleSpot.price} night</p>
        <p><i class="fa-sharp fa-solid fa-star"></i>{singleSpot.avgStarRating}</p>
        <p>{singleSpot.numReviews}</p>
        <button>Reserve</button>
      </div>
    </div>
    <GetSpotReview />
    </>
  );
};
export default GetSingleSpot;
