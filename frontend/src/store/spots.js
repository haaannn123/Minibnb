import { csrfFetch } from "./csrf";

/* Action Type Constants */
export const GET_SPOTS = "spots/GET_SPOTS";
export const GET_SINGLE_SPOT = "spots/GET_SINGLE_SPOT";
export const CREATE_SPOT = "spots/CREATE_SPOT";
export const USER_SPOT = "spots/USER_SPOT";
export const UPDATE_SPOT = "spots/UPDATE_SPOT";
export const DELETE_SPOT = "spots/DELETE_SPOT";

/* Action Creator */
export const allSpots = (spots) => ({
  type: GET_SPOTS,
  spots,
});

export const singleSpot = (spotId) => ({
  type: GET_SINGLE_SPOT,
  spotId,
});

export const createSpot = (spotObj) => ({
  type: CREATE_SPOT,
  spotObj,
});

export const userSpot = (userSpotObj) => ({
  type: USER_SPOT,
  userSpotObj,
});

export const updatedSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

/* THUNK Action Creator */
// making fetch requesst to backend
export const fetchSpots = () => async (dispatch) => {
  const res = await fetch("/api/spots");
  if (res.ok) {
    const spots = await res.json();
    dispatch(allSpots(spots));
  }
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
  const res = await fetch(`/api/spots/${spotId}`);
  if (res.ok) {
    const spotId = await res.json();
    dispatch(singleSpot(spotId));
  }
};

export const newSpot = (spots, spotImages) => async (dispatch) => {
  const response = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spots),
  });

  if (response.ok) {
    const newSpot = await response.json();
    const uploadedImages = [];

    for (let image of spotImages) {
      const spotImageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
      });

      if (spotImageResponse.ok) {
        const spotImage = await spotImageResponse.json();
        uploadedImages.push(spotImage.spotImages);
      }
    }

    newSpot.previewImage = uploadedImages;
    dispatch(createSpot(newSpot));
    return newSpot;
  }

  return response;
};

export const fetchUserSpots = () => async (dispatch) => {
  const res = await csrfFetch("/api/spots/current");

  if (res.ok) {
    const spots = await res.json();
    dispatch(userSpot(spots));
    return spots;
  }

  if (res.status === 404) {
    return {};
  }
};

export const updateSpot = (spot, spotId, spotImages) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (res.ok) {
    const newSpot = await res.json();
    const uploadedImages = [];

    for (let image of spotImages) {
      const spotImageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
      });

      if (spotImageResponse.ok) {
        const spotImage = await spotImageResponse.json();
        uploadedImages.push(spotImage.spotImages);
      }
    }

    newSpot.previewImage = uploadedImages;
    dispatch(updateSpot(newSpot));
    return newSpot;
  }
};

export const removeSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    dispatch(deleteSpot(spotId));
    dispatch(fetchUserSpots())
  }
};

export const thunkGetSearchResults = (query) => async (dispatch) => {
  const response = await fetch (`/api/search/${query}`);

  if (response.ok){
      const searchResults = await response.json();
      dispatch(allSpots(searchResults));
  }
}

/* Reducer */
let initialState = {
  allSpots: {},
  singleSpot: {},
  user: {},
};

const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_SPOTS:
      newState = { ...state };
      const allSpots = {};
      action.spots.Spots.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      newState.allSpots = allSpots;
      return newState;
    case GET_SINGLE_SPOT:
      newState = { ...state, singleSpot: { ...state.singleSpot } };
      // const singleSpot = {}
      newState.singleSpot = action.spotId;
      return newState;
    case CREATE_SPOT:
      newState = { ...state, singleSpot: { ...state.singleSpot } };
      newState.singleSpot = action.spotObj;
      return newState;
    case USER_SPOT:
      newState = { ...state };
      const user = {};
      action.userSpotObj.Spots.forEach((spot) => {
        user[spot.id] = spot;
      });
      newState.user = user;
      return newState;
    case UPDATE_SPOT:
      newState = { ...state };
      newState.singleSpot[action.spot] = action.list;
      return newState;
    case DELETE_SPOT:
      newState = { ...state };
      delete newState.allSpots[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
