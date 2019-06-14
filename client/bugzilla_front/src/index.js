import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


import rootReducer from './reducers'
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}>
    <App />
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();
