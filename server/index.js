import {Store} from './src/Store';
import {VoteServer} from './src/VoteServer';

let store = new Store();
export const newStore = store.make();
let voteServer = new VoteServer();
voteServer.start(newStore);

newStore.dispatch({
  type: 'LOAD',
  entries: require('./src/data/entries.json')
});
newStore.dispatch({type: 'NEXT'});
