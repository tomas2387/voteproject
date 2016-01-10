import React from 'react';

import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import Router, {Route} from 'react-router';
import App from './components/App';
import {ResultsContainer} from './components/Results';
import {VotingContainer} from './components/Voting';
import remoteActionMiddleware from './remote_action_middleware';

const socket = io(`${location.protocol}//${location.hostname}:9090`);
const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on('state', state => {
  "use strict";
  console.log('State received', state);
  store.dispatch(setState(state));
});

const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
