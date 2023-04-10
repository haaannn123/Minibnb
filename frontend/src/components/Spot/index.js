import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchSpot } from '../../store/spots';

const Spot = () => {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.singleSpot);
    console.log("SINGLESPOT:", spot);

    useEffect(() => {
        dispatch(fetchSpot())
    }, [dispatch])

    return (
        <div>
            <h1>Hello this is rendering</h1>
        </div>
    )
}

export default Spot;
