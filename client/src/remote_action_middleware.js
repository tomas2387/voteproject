export default socket => {
  "use strict";
  return store => next => action => {
    if (action.meta && action.meta.remote) {
      socket.emit('action', action);
    }
    return next(action);
  };
};
