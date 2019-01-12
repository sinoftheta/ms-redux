// REACT //
import React from 'react';
import ReactDOM from 'react-dom';

// STYLE //
import './style/index.css';

// APP //
import App from './App';

// REDUX //
import { Provider } from 'react-redux';
import {store} from './redux/store.js';
// why-did-you-update
if (process.env.NODE_ENV !== 'production') {
    const {whyDidYouUpdate} = require('why-did-you-update')
    whyDidYouUpdate(React)
}



// render the app
ReactDOM.render( 
    <Provider store={store()}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
