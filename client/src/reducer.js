import {List, Map} from 'immutable';

function setState(state, newState) {
  "use strict";
  return state.merge(newState);
}

function resetVote(state) {
  "use strict";
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

function vote(state, entry) {
  "use strict";
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

export default function(state = Map(), action = null) {
  "use strict";

  if(!action) {
    return state;
  }

  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
  }

  return state;
}
