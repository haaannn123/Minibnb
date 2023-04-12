import { csrfFetch } from './csrf';

/* Action Type Constants */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SINGLE_SPOT = "spots/GET_SINGLE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";
export const MANAGE_SPOT = "spots/MANAGE_SPOT"

/* Action Creator */
export const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const singleSpot = (spotId) => ({
    type: GET_SINGLE_SPOT,
    spotId
});

export const createSpot = (spotObj) => ({
    type: CREATE_SPOT,
    spotObj
});

export const userSpots = (userSpotObj) => ({
    type: MANAGE_SPOT,
    userSpotObj
})

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
    const res = await fetch(`/api/spots/${spotId}`);
    if (res.ok){
        const spotId = await res.json();
        // console.log(spotId);
        dispatch(singleSpot(spotId))
    }
}

export const newSpot = (spots) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spots)
    });

    if (res.ok){
        const spots = await res.json();
        dispatch(createSpot(spots));
        return spots;
    }
}

export const fetchUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');

    if (res.ok){
        const userSpots = await res.json();
        dispatch(fetchUserSpots(userSpots))
    }
}


/* Reducer */
let initialState = {
    allSpots: {},
    singleSpot: {},
    userSpots: {}
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
            newState = {...state, singleSpot: {...state.singleSpot}}
            // const singleSpot = {}
            newState.singleSpot = action.spotId
            return newState;
        case CREATE_SPOT:
            newState = {...state, singleSpot: {...state.singleSpot}};
            newState.singleSpot = action.spotObj
            return newState;
        case MANAGE_SPOT:
            newState = {...state};
            const userSpots = {};
            action.userSpotObj.Spots.forEach((spot) => {
                userSpots[spot.id] = spot;
            });
            newState.userSpots = userSpots;
            return newState;
    default:
        return state;
    }
}

export default spotReducer;
