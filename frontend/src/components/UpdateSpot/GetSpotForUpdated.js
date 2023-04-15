import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";
import { useParams } from "react-router-dom";
import UpdateSpot from ".";
const GetSpotForUpdated = () => {
    const {spotId} = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId))
    });

    const spot = useSelector((state) => state.spot.singleSpot);

    if (spot){
        return <UpdateSpot spot={spot}/>
    } else {
        return null;
    }
}

export default GetSpotForUpdated;
