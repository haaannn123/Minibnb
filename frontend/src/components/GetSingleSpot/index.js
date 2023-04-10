import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";

const GetSingleSpot = () => {
    const spotId = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatchEvent(fetchSingleSpot())
    }, [dispatch])
    return (
        <div>
            <h3>SINGLE SPOT TEST</h3>
        </div>
    )
}
export default GetSingleSpot;
