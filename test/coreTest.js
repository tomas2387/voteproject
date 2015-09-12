import {assert} from 'chai';
import {List, Map} from 'immutable';
import {Core} from '../src/Core'

suite('Application Logic', () => {
  let sut;
  setup(() => {
    sut = new Core();
  });

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
      const nextState = sut.setEntries(state, entries);
      assert.equal(nextState, expected);
    }

  });


  suite('next', () => {

    test('call next should return the next two access point names for vote', () => {

      const state = Map({
        entries: List.of('InternalError', 'Happy AP', 'Dont Hack this')
      });
      const nextState = sut.next(state);

      assert.equal(nextState, Map({
        vote: Map({
          pair: List.of('InternalError', 'Happy AP')
        }),
        entries: List.of('Dont Hack this')
      }));
    });

    test('call next when there are less than 2 entries left should return one of vote', () => {

            const state = Map({
              entries: List.of('InternalError')
            });
            const nextState = sut.next(state);

            assert.equal(nextState, Map({
              vote: Map({
                pair: List.of('InternalError')
              }),
              entries: List()
            }));
    });

  });

  suite('vote', ()=>{

    test('creates an score for the voted entry', () => {
        const state = Map({
          vote: Map({
            pair: List.of('InternalError', 'our happy ap')
          }),
          entries: List.of('stop hacking me', 'stop the loud music')
        });
        const nextState = sut.vote(state, 'InternalError');

        assert.equal(nextState, Map({
          vote: Map({
            pair: List.of('InternalError', 'our happy ap'),
            score: Map({
              'InternalError': 1
            })
          }),
          entries: List.of('stop hacking me', 'stop the loud music')
        }));
    });

    test('when vote is called with a state with scores it should update the score',  ()=> {
      const state = Map({
        vote: Map({
          pair: List.of('InternalError', 'our happy ap'),
          score: Map({
            'InternalError': 3,
            'our happy ap': 2
          })
        }),
        entries: List.of('stop hacking me', 'stop the loud music')
      });
      const nextState = sut.vote(state, 'InternalError');

      assert.equal(nextState, Map({
        vote: Map({
          pair: List.of('InternalError', 'our happy ap'),
          score: Map({
            'InternalError': 4,
            'our happy ap': 2
          })
        }),
        entries: List.of('stop hacking me', 'stop the loud music')
      }));
    });

  });


});
