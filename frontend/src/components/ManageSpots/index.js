import './ManageSpots.css'
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchUserSpots } from '../../store/spots';

const ManageSpots = () => {
    // const dispatch = useDispatch();
    // const userSpots = useSelector(state => state.spot.userSpots);
    // console.log("USERSPOTS", userSpots);

    // useEffect(() => {
    //     dispatch(fetchUserSpots())
    // }, [dispatch])

    return (
        <div>
           <h1>Manage Your Spots</h1>
           <NavLink>
                <button>
                    Create a New Spot
                </button>
                {/* data goes here */}


                <button>Update</button>
                <button>Delete</button>
           </NavLink>
        </div>
    )
}

export default ManageSpots;
