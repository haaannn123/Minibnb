import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {useParams} from 'react-router-dom'
import { fetchReviews } from "../../store/review";

const GetSpotReview = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const reviews = useSelector((state) => state.reviews[spotId]);

    useEffect(() => {
        dispatch(fetchReviews(spotId))
    }, [dispatch,spotId]);

    if (!reviews) return null;

    const formattedDate = new Date(reviews.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        {if (reviews) {
            <div>
            <h4>{reviews.User.firstName}</h4>
            <h5>{formattedDate}</h5>
            <p>{reviews.review}</p>
        </div>
        } else {
            
        }}
    )
};
export default GetSpotReview;
