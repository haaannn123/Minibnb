import { csrfFetch } from './csrf';

/* Action Type Constants */
export const GET_SPOTS = "spots/GET_SPOTS";

/* Action Creator */
export const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
})


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


/* Reducer */
let initialState = {
    allSpots : {},
    singleSpots : {}
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
    default:
        return state;
    }
}

export default spotReducer;
