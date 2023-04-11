/* Action Type Constants */
export const GET_REVIEWS = "reviews/GET_REVIEWS";

/* Action Creator */
export const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews
});

export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok){
        const reviews = await res.json();
        dispatch(getReviews(reviews))
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
    default:
        return state;
    }
};

export default reviewReducer;
