import {createStore} from 'redux';
import {Reducer} from './Reducer';

export class Store {
  make() {
    let reducer = new Reducer();
    return createStore(reducer.reduce.bind(reducer));
  }
}
