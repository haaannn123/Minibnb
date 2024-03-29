import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import sessionReducer from './session';
import spotReducer from './spots'
import reviewReducer from './review';
import bookingsReducer from './bookings';

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotReducer,
  reviews: reviewReducer,
  bookingsReducer,
});

// in production, the enhancer should only apply the thunk middlware
// in development, the logger middleware and Redux dev tools compose enhancer as well
let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}
// attaches the Redux store to the React application
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

export default configureStore;
