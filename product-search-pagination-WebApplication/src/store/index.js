import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension'; // For Redux DevTools
import { thunk } from 'redux-thunk'; // Use named import for thunk
import productReducer from './reducers/productReducer';

// Combine all reducers
const rootReducer = combineReducers({
    products: productReducer,
});

// Create the store with middleware and Redux DevTools support
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)) // Apply middleware
);

export default store;

// Export actions and thunks for use in your components
export { setDummyVariable, fetchProducts } from './reducers/productReducer';
