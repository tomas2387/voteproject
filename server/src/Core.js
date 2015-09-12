import {List,Map} from 'immutable';

export const INITIAL_STATE = Map();

export class Core {

  load(state, newEntries) {
    return state.set('entries', List(newEntries));
  }

  next(state) {
    const winner = this.winner(state.get('vote'));
    const entries = state.get('entries').concat(winner);
    if(entries.size === 1) {
      return state.remove('vote')
                  .remove('entries')
                  .set('winner', entries.first());
    }

    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }

  vote(state, entryName) {
    return state.updateIn(
      ['score', entryName],
      0,
      score => score + 1
    );
  }

  winner(voteList) {
    if(!voteList) {
      return [];
    }
    const [a, b] = voteList.get('pair');
    const aScore = voteList.getIn(['score', a], 0);
    const bScore = voteList.getIn(['score', b], 0);
    if(aScore > bScore) return [a];
    else if(bScore > aScore) return [b];
    else return [a, b];
  }
}
