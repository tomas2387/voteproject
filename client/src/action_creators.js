export function setState(state) {
  "use strict";
  console.log('action', 'setState');
  return {
    type: 'SET_STATE',
    state
  };
}

export function vote(entry) {
  "use strict";
  console.log('action', 'vote', entry);
  return {
    meta: {remote: true},
    type: 'VOTE',
    entry
  };
}

export function next() {
  "use strict";
  console.log('action', 'next');
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}
