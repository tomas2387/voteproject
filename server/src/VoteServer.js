import Server from 'socket.io';

export class VoteServer {
  start(store) {
    this.io = new Server().attach(9090);
    console.log('Listening to localhost:9090');
    store.subscribe(
      () => this.io.emit('state', store.getState().toJS())
    );

    this.io.on('connection', (socket) => {
      console.log('Connection received', socket.id);
      console.log('Sending state to '+socket.id, store.getState().toJS());
      socket.emit('state', store.getState().toJS());

      console.log('Listening to any actions from ', socket.id);
      socket.on('action', store.dispatch.bind(store));
    });
  }
}
