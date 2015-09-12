import {List} from 'immutable';

export class Core {

  setEntries(state, newEntries) {
    return state.set('entries', List(newEntries));
  }
}
