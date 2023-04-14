import { csrfFetch } from "./csrf";

/* Action Type Constants */
export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const CREATE_REVIEWS = "reviews/CREATE_REVIEWS";
export const DELETE_REVIEWS = 'reviews/DELETE_REVIEWS';

/* Action Creator */
export const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

export const createReviews = (reviewObj) => ({
    type: CREATE_REVIEWS,
    reviewObj
});

export const deleteRemove = (review) => ({
    type: DELETE_REVIEWS,
    review
})

/* THUNK ACTION CREATOR */
export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok){
        const reviews = await res.json();
        dispatch(getReviews(reviews))
    }
}

export const newReview = (review, spotId, user) => async (dispatch ) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });

    if (res.ok){
        const reviews = await res.json();
        reviews.User = user;
        dispatch(createReviews(reviews));
        return reviews;
    }
}

export const removeReviews = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`api/reviews/${reviewId}`);

    if (res.ok){
        dispatch(deleteRemove(reviewId))
    }
}

let initialState = {
    spot: {}
}

const reviewReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_REVIEWS:
            newState = {...state};
            const spot = {}
            action.reviews.Review.forEach((review) => {
                spot[review.id] = review;
            })
            newState.spot = spot
            return newState;
        case CREATE_REVIEWS:
            newState = {...state, spot: {...state.spot}};
            newState.spot[action.reviewObj.id] = action.reviewObj
            return newState;
        case DELETE_REVIEWS:
            const deleteState = {...state, spot:{...state.spot}};
            delete removeReviews[action.review];
            return deleteState
    default:
        return state;
    }
};

export default reviewReducer;
