import {assert} from 'chai';
import {List, Map} from 'immutable';
import {Core} from '../src/Core'

suite('[+] Core Logic', () => {
  let sut;
  setup(() => {
    sut = new Core();
  });

  suite('load', () => {

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
      const nextState = sut.load(state, entries);
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

    test('call next when there is a winner in score should put again in the entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('InternalError', 'happy AP'),
          score: Map({
            'InternalError':4,
            'happy AP': 2
          }),
        }),
        entries: List.of('dont hack me', 'loud music neighbor', 'free wifi')
      });

      const nextState = sut.next(state);
      const expected = Map({
        vote: Map({
          pair: List.of('dont hack me', 'loud music neighbor')
        }),
        entries: List.of('free wifi', 'InternalError')
      });
      assert.equal(nextState, expected);
    });

    test('call next when there is a tie should put again the two names in the entries', () => {
        const state = Map({
          vote: Map({
            pair: List.of('InternalError', 'My HAPPY AP'),
            score: Map({
              'InternalError':2,
              'My HAPPY AP':2
            })
          }),
          entries: List.of('DONTHACKME', 'FUCKING LOUD MUSIC NEIGHBOR 4_2', 'free wifi')
        });

        const nextState = sut.next(state);
        const expected = Map({
          vote: Map({
            pair: List.of('DONTHACKME', 'FUCKING LOUD MUSIC NEIGHBOR 4_2')
          }),
          entries: List.of('free wifi', 'InternalError', 'My HAPPY AP')
        });
    });

    test('call next when there is no entry left should put that last winner vote as final winner', () => {
        const state = Map({
          vote: Map({
            pair: List.of('InternalError', 'free wifi'),
            score: Map({
              'InternalError': 4,
              'free wifi': 3
            })
          }),
          entries: List()
        });

        const nextState = sut.next(state);
        assert.equal(nextState, Map({winner: 'InternalError'}));
    });
  });

  suite('vote', ()=>{

    test('creates an score for the voted entry', () => {
      const state = Map({
        pair: List.of('InternalError', 'our happy ap')
      });
      const expected = Map({
          pair: List.of('InternalError', 'our happy ap'),
          score: Map({'InternalError': 1})
      });
      const votedName = 'InternalError';
      verifyVote(state, votedName, expected);
    });

    test('when vote is called with a state with scores it should update the score',  ()=> {
      const state = Map({
          pair: List.of('InternalError', 'our happy ap'),
          score: Map({'InternalError': 3,'our happy ap': 2})
      });
      const expected = Map({
          pair: List.of('InternalError', 'our happy ap'),
          score: Map({'InternalError': 4,'our happy ap': 2})
      });
      verifyVote(state, 'InternalError', expected);
    });

    function verifyVote(state, votedName, expected) {
      const nextState = sut.vote(state, votedName);
      assert.equal(nextState, expected);
    }
  });



});
