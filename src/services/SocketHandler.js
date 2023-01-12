import SocketIO, {EVENTS} from './SocketIO';

// chat related emits
export const socketEmit = (types, eventName, payload, cbOnSuccess) => {
  SocketIO.getInstance().emit(eventName, payload, (data, message) => {
    cbOnSuccess(data, message);
  });
};

// Request listner for incoming ride
export const socketListeners = (types, eventName, cbOnSuccess) => {
  SocketIO.getInstance().listen(eventName, cbOnSuccess);
};

export const disconnectSocket = user => {
  let payload = {
    user_id: user.id,
  };
  SocketIO.getInstance().emit('_disconnect_socket', payload, data => {
    SocketIO.getInstance().disconnect('');
  });
};

export const removeChatListeners = () => {
  SocketIO.getInstance().socketInstance.removeAllListeners('');
};
