import React from 'react';
import ReactDOM from 'react-dom';
import { Welcome } from './welcome';
import { App } from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducers';
import * as serviceWorker from './serviceWorker';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let element;
if (window.location.pathname === "/welcome") {
    element = <Welcome />;
} else {
    element = (
        <Provider store = { store }>
            <App />
        </Provider>
    );
}

ReactDOM.render(element, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
