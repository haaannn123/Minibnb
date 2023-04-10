// import { csrfFetch } from './csrf';

/* Action Type Constants */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SINGLE_SPOT = "spots/GET_SINGLE_SPOT";

/* Action Creator */
export const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const singleSpot = (spotId) => ({
    type: GET_SINGLE_SPOT,
    spotId
});

/* THUNK Action Creator */
// making fetch requesst to backend
export const fetchSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');

    if (res.ok){
        const spots = await res.json();
        dispatch(allSpots(spots))
    }
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
    console.log(spotId)
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok){
        const spotId = await res.json();
        console.log(spotId)
        dispatch(singleSpot(spotId))
    }
}

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
                allSpots[spot.id] = spot
            })
            newState.allSpots = allSpots;
            return newState;
        case GET_SINGLE_SPOT:
            newState = {...state}
            // const singleSpot = {}
            newState.singleSpot[action.spotId.id] = action.spotId
            return newState;
    default:
        return state;
    }
}

export default spotReducer;
