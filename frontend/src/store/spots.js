import { csrfFetch } from './csrf';

/* Action Type Constants */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SPOT = "spots/GET_SPOT";

/* Action Creator */
export const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const spot = (spots) => ({
    type: GET_SPOT,
    spots
});

/* THUNK Action Creator */
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');

    if (res.ok){
        const spots = await res.json();
        dispatch(allSpots(spots))
    }
}
// make thunk
// connect to component
// make sure it works

export const fetchSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok){
        const spots = await res.json();
        dispatch(spot(spots))
    }
};

/* Reducer */
let initialState = {
    allSpots: {},
    singleSpot: {}
};

const spotReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_SPOTS:
            newState = {...state}
            const allSpots = {}
            // state is empty right now
            action.spots.Spots.forEach((spot) => {
                allSpots[spot.id] = spot;
            });
            newState.allSpots = allSpots;
            return newState;
        case GET_SPOT:
            newState = {...state}
            const singleSpot = {}
            action.spots.Spots.forEach((spot) => {
                singleSpot[spot.id] = spot;
            });
            newState.singleSpot = singleSpot;
            return newState;
    default:
        return state;
    }
}

export default spotReducer;
