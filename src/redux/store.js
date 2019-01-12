// REDUX //
import { createStore, applyMiddleware } from "redux";

// REDUX THUNK //
import reduxThunk from 'redux-thunk';
import rootReducer from "./reducers/reducers";

// create the store
export const store = (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(reduxThunk),   
    );
}