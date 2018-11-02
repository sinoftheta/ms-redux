import React from 'react';
import ReactDOM from 'react-dom';


// STYLE //
import './style/index.css';


// APP //
import App from './App';


// REDUX //
import { Provider } from 'react-redux';
import { Store } from "./redux/store";

const store = Store();

ReactDOM.render( 
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
