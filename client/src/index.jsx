import React from 'react';
import VotingContainer from './components/Voting';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';
import Router, {Route} from 'react-router';
import App from './components/App';
import {ResultsContainer} from './components/Results';
import io from 'socket.io-client';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:9090`);
socket.on('state', state => {
  "use strict";
  console.log('State received', state);
  store.dispatch({type: 'SET_STATE', state: state});
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
