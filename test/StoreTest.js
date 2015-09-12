import {Map, fromJS} from 'immutable';
import {assert} from 'chai';
import {Store} from '../src/Store';

suite('[+] Store', ()=>{

  let store;
  setup(()=>{
    store = new Store();
  });

  test('when dispatch called it should correctly call the action', ()=> {
    const currentStore = store.make();
    verifyCurrentState(currentStore, Map());

    currentStore.dispatch({
      type:'LOAD',
      entries:['free wifi', 'InternalError']
    });
    verifyCurrentState(currentStore, fromJS({
      entries: ['free wifi', 'InternalError']
    }));
  });

  function verifyCurrentState(currentStore, expected) {
    assert.equal(currentStore.getState(), expected);
  }

});
