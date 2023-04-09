import { fetchSpots } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./GetAllSpots.css"

const GetAllSpots = () => {
    const dispatch = useDispatch();

    const spots = Object.values(useSelector((state) => state.spots.allSpots));
    console.log("SPOTS:", spots)

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch]);


    return (
        <div>
          {spots.map((spot) => {
            return (
                <div className="card">
                    <img src={spot.previewImage} alt="house" className="card-image"/>
                    <div className="card-location">
                        <h3>{`${spot.city}, ${spot.state}`}</h3>
                        <h3>{spot.avgRating}</h3>
                    </div>
                    <h4>{spot.price}</h4>
                </div>
            )
          })}
        </div>
    )
};

export default GetAllSpots;
