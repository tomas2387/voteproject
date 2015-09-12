import {Core, INITIAL_STATE} from '../src/Core';

export class Reducer {
  constructor() {
    this.core = new Core();
  }

  reduce(state = INITIAL_STATE, action = {type:undefined}) {
    if(action.type === 'LOAD') return this.core.load(state, action.entries);
    if(action.type === 'NEXT') return this.core.next(state);
    if(action.type === 'VOTE') return state.update('vote', voteState => this.core.vote(voteState, action.entry));
    return state;
  }
}
