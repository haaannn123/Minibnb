import './ManageSpots.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserSpots } from '../../store/spots';
const ManageSpots = () => {
    const dispatch = useDispatch();
    const obj = useSelector((state) => console.log(state));
    console.log(obj);

    useEffect(() => {
        dispatch(fetchUserSpots)
    }, [dispatch])
    return (
        <div>
           <h1>Manage Your Spots</h1>
                <button>
                    Create a New Spot
                </button>
        </div>
    );
}

export default ManageSpots;
