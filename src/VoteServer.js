import Server from 'socket.io';

export class VoteServer {
  start(store) {
    this.io = new Server().attach(8090);
    console.log('Listening to localhost:8090');
    store.subscribe(
      () => this.io.emit('state', store.getState().toJS())
    );

    this.io.on('connection', (socket) => {
      socket.emit('state', store.getState().toJS());

      socket.on('action', store.dispatch.bind(store));
    });
  }
}
