import { csrfFetch } from "./csrf";

/* Action Type Constants */
export const GET_REVIEWS = "reviews/GET_REVIEWS";
export const CREATE_REVIEWS = "reviews/CREATE_REVIEWS";

/* Action Creator */
export const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

export const createReviews = (reviewObj) => ({
    type: CREATE_REVIEWS,
    reviewObj
})

/* THUNK ACTION CREATOR */
export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok){
        const reviews = await res.json();
        dispatch(getReviews(reviews))
    }
}

export const newReview = (review, spotId) => async (dispatch ) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });

    if (res.ok){
        const reviews = await res.json();
        dispatch(createReviews(reviews))
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
            console.log("ACTION:", action)
            action.reviews.Review.forEach((review) => {
                spot[review.id] = review;
            })
            return newState.spot = spot;
        case CREATE_REVIEWS:
            newState = {...state};
            newState.spot[action.reviewObj.id] = action.reviewObj
    default:
        return state;
    }
};

export default reviewReducer;
