import {Map, fromJS} from 'immutable';
import {assert} from 'chai';
import {Reducer} from '../src/Reducer';

suite('[+] Reducer', ()=>{
  let sut;

  setup(()=>{
    sut = new Reducer();
  });

  test('when called reducer with undefined state it should initiate correctly', ()=>{
    const action = {type:'LOAD', entries: ['InternalError']};
    const nextState = sut.reduce(undefined, action);
    assert.equal(nextState, fromJS({entries:['InternalError']}));
  });

  test('when called reducer with no parameters should return initial state',  ()=>{
    const nextState = sut.reduce();
    assert.equal(nextState, Map());
  });

  test('when called reducer with load it should handle action correctly', ()=>{
    const state = Map();
    const action = {type: 'LOAD', entries: ['InternalError']};
    const nextState = sut.reduce(state, action);
    assert.equal(nextState, fromJS({entries: ['InternalError']}));
  });

  test('when called reducer with next action it should handle action correctly',  ()=> {
    const state = fromJS({
      entries: ['InternalError', 'free wifi']
    });
    const action = {type: 'NEXT'};
    const nextState = sut.reduce(state, action);
    assert.equal(nextState, fromJS({
      vote: {
        pair: ['InternalError', 'free wifi']
      },
      entries: []
    }));
  });

  test('when called reducer with vote action it should handle action correctly',  ()=> {
    const state = fromJS({
      vote: {
        pair: ['InternalError', 'free wifi'],
      },
      entries: []
    });
    const action = {type: 'VOTE', entry: 'InternalError'};
    const nextState = sut.reduce(state, action);
    assert.equal(nextState, fromJS({
      vote: {
        pair: ['InternalError', 'free wifi'],
        score: {
          'InternalError':1
        }
      },
      entries: []
    }));
  });

});
