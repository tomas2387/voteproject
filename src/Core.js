import {List,Map} from 'immutable';

export class Core {

  setEntries(state, newEntries) {
    return state.set('entries', List(newEntries));
  }

  next(state) {
    const entries = state.get('entries');
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }

  vote(state, entryName) {
    return state.updateIn(
      ['vote', 'score', entryName],
      0,
      score => score + 1
    );
  }
}
