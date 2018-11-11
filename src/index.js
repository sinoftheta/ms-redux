// REACT //
import React from 'react';
import ReactDOM from 'react-dom';

// STYLE //
import './style/index.css';

// APP //
import App from './App';

// REDUX //
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";

// REDUX THUNK //

import reduxThunk from 'redux-thunk';
import rootReducer from "./reducers/reducers";


// create the store
const store = (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(reduxThunk),   
    );
}

// render the app
ReactDOM.render( 
    <Provider store={store()}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
