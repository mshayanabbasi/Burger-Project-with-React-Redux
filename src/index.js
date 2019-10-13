import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import './index.css';
import thunk from 'redux-thunk'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'
import authReducer from './store/reducers/auth'
import { watchAuth, watchBurgerBuilder } from './store/sagas'

const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;

const rootReducer = combineReducers({
	burgerBuilder: burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(
		applyMiddleware(thunk, sagaMiddleware)
))

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
const app = (
	<Provider store={store}>
    	<Router>
        	<App />
    	</Router>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
