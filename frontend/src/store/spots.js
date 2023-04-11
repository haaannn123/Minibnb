<<<<<<< HEAD

=======
import { application } from 'express';
>>>>>>> f0f437e362e9038adb6ef31df37a4092eb3b5d55
import { csrfFetch } from './csrf';

/* Action Type Constants */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SINGLE_SPOT = "spots/GET_SINGLE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";

/* Action Creator */
export const allSpots = (spots) => ({
    type: GET_SPOTS,
    spots
});

export const singleSpot = (spotId) => ({
    type: GET_SINGLE_SPOT,
    spotId
});

export const createSpot = (spotList) => ({
    type: CREATE_SPOT,
    spotList
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
    // console.log("RES:", res);

    if (res.ok){
        const spotId = await res.json();
        // console.log(spotId);
        dispatch(singleSpot(spotId))
    }
}

// export const newSpot = (spots) => async (dispatch) => {
<<<<<<< HEAD
//     const res = await csrfFetch(`/api/spots/new`, {
=======
//     const res = await csrfFetch(`/api/spots/`, {
>>>>>>> f0f437e362e9038adb6ef31df37a4092eb3b5d55
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spots)
//     });
<<<<<<< HEAD
=======

//     if (res.ok){
//         const newSpot = await res.json();
//     }
>>>>>>> f0f437e362e9038adb6ef31df37a4092eb3b5d55
// }


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
            newState.singleSpot = action.spotId
            return newState;
    default:
        return state;
    }
}

export default spotReducer;
