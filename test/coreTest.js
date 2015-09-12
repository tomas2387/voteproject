import {assert} from 'chai';
import {List, Map} from 'immutable';
import {Core} from '../src/Core'

suite('Application Logic', () => {

  suite('setEntries', () => {

    test('when call to setEntries it should add all the entries to the state',  () => {
      const entries = List.of('AP Name 1', 'AP Name 2');
      const expected = Map({entries: List.of('AP Name 1', 'AP Name 2')});
      verify(entries, expected);
    });

    test('when call to setEntries with an array it should convert it to a inmutable List',  () => {
      const entries = ['Ap Name 1', 'Ap Name 2'];
      const expected =  Map({entries: List.of('Ap Name 1', 'Ap Name 2')});
      verify(entries, expected);
    });

    function verify(entries, expected) {
      const state = Map();
      const core = new Core();
      const nextState = core.setEntries(state, entries);
      assert.equal(nextState, expected);
    }

  });



});
