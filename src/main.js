import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './containers/app';
import Homepage from './containers/homepage';
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER, payload:true });
}

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
      <Route path="/" component={App}>
      <IndexRoute component={Homepage}/>

    </Route>
  </Router>

  </Provider>
  , document.getElementById('root'));
