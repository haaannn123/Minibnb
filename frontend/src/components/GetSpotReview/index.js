import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {useParams} from 'react-router-dom'
import { fetchReviews } from "../../store/review";

const GetSpotReview = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const review = useSelector((state) => console.log("REVIEW:", state));
    
    useEffect(() => {
        dispatch(fetchReviews(spotId))
    }, [dispatch,spotId])
    return (
        <div>
            <h3>Hello THIS IS WORKING</h3>
        </div>
    )
};
export default GetSpotReview;
