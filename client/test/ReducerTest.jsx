import {List, Map, fromJS} from 'immutable';

import {assert} from 'chai';
import reducer from '../src/reducer';

suite('Reducer', () => {
  "use strict";

  [
    {
      initialState: Map(),
      action: {type: 'SET_STATE', state: Map({vote: Map({pair: List.of('Trainspotting', '28 Days Later'),score: Map({Trainspotting: 1})})})},
      expected: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}})
    },
    {
      initialState: Map(),
      action: {type: 'SET_STATE',state: {vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}}},
      expected: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}})
    },
    {
      initialState: undefined,
      action: {type: 'SET_STATE',state: {vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}}},
      expected: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}})
    },
    {
      initialState: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}}),
      action: {type: 'VOTE', entry: 'Trainspotting'},
      expected: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}},hasVoted: 'Trainspotting'})
    },
    {
      initialState: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}}),
      action: {type: 'VOTE', entry: 'Sunshine'},
      expected: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}})
    },
    {
      initialState: fromJS({vote: {pair: ['Trainspotting', '28 Days Later'],score: {Trainspotting: 1}}, hasVoted: 'Trainspotting'}),
      action: {type: 'SET_STATE', state: {vote: {pair: ['Sunshine', 'Slumdog Millionaire']}}},
      expected: fromJS({vote: {pair: ['Sunshine', 'Slumdog Millionaire']}})
    }
  ].
  forEach(function(element, index) {

    test('#' + index + ' -> handles '+element.action.type, () => {
      const initialState = element.initialState;
      const action = element.action;
      const nextState = reducer(initialState, action);
      assert.equal(nextState, element.expected);
    });

  });

});
