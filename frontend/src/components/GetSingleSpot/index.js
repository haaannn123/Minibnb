import { useParams } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";

const GetSingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const singleSpot = (useSelector((state) => state.spots.singleSpot));
    console.log(singleSpot.spotId)

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId))
    }, [dispatch])
    return (
        <div>

        </div>
    )
}
export default GetSingleSpot;
