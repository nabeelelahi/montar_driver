import SocketIOClient from 'socket.io-client';
import {FlashMessage} from '../reuseableComponents';

const SOCKET_URL = 'http://208.115.210.219';
const SOCKET_PORT_DEV = '5111'; // dev port
const SOCKET_PORT_QA = '5113'; // qa port
// export const BASE_URL_SOCKET = `${SOCKET_URL}:${'3340'}`;//Dev
export const BASE_URL_SOCKET = `${SOCKET_URL}:${'3001'}`;

console.log('socket url : ', BASE_URL_SOCKET);

let isReceivedMessageListenerInitialized = false;

export const EVENTS = {
  DISCONNECT: '_disconnect_socket',
  FING_DRIVERS: '_find_drivers',
  RIDE_WHEN_ACCEPTED: '_rider_when_accept_req',
  RIDER_ACCEPTE_REQ: '_rider_accept_request',
  RIDER_START_JOB: '_rider_start_job',
  RIDER_COMPLETE_JOB: '_rider_complete_ride',
  GENETRATE_REQUEST: '_generate_request',
  RIDE_ACCEPT_BY_RIDER: '_ride_accept_rider',
  WAITING_ACCEPT_REQUEST: '_waiting_accept_req',
  RIDER_REJECT_REQ: '_rider_reject_request',
  RIDER_TRACKING: '_rider_track',

  RIDE_BOOK: '_ride_book',
  RIDE_START: '_rider_start',

  USER_CANCEL_BOOKING: '_customer_before_accept_cancel_booking',
  USER_CANCEL_ACCEPTED_BOOKING: '_customer_cancel_booking',

  VECHILE_RESCUED: '_vehicle_rescued',
  VEHICLE_DELIVERED: '_vehicle_deliverd',

  CURTOMER_RATE_RIDER: '_customer_rate_rider',
  CUSTOMER_TIP_RIDER: '_customer_tip_rider',

  RIDER_CANCEL_RIDE: '_rider_cancel',

  USER_WAIT_ACCEPT_RIDE: '_rider_waiting_accept_req',
};

export default class SocketIO {
  static myInstance = null;
  static socketInstance = null;
  /*
  creating class instance
  */
  static getInstance() {
    if (SocketIO.myInstance == null) {
      SocketIO.myInstance = new SocketIO();
    }
    return this.myInstance;
  }

  /*
   creating socket instance and
   connecting to socket
  */
  static init(user) {
    global.log('SOCKET INITIALIZING', user.api_token);

    SocketIO.getInstance().socketInstance = new SocketIOClient(
      BASE_URL_SOCKET,
      {
        transports: ['websocket'], // this is important as default transport type is "polling",
        autoConnect: true,
        query: {
          authorization: user.api_token,
          device_type: user.device_type,
          device_token: user.device_token,
        },
      },
    );

    return SocketIO.getInstance().socketInstance;
  }

  /*
  connect to socket manually
  */
  static connectToSocket(user, cbOnConnect) {
    console.log('connect to socket called');
    SocketIO.getInstance().socketInstance.io.opts = {
      ...SocketIO.getInstance().socketInstance.io.opts,
      path: '/socket.io',
      autoConnect: true,
    };

    SocketIO.getInstance().socketInstance.connect();

    SocketIO.getInstance().socketInstance.on('connect', cbOnConnect);
  }

  static JoinSocket(user) {
    let params = {
      user_id: user.id,
    };

    SocketIO.getInstance().emit('_join_socket', params, data => {
      //   console.log('_joinSocketCb response event : ', data);
    });
    SocketIO.getInstance().socketInstance.on('_join_room', data => {
      //   console.log('_joinSocketCb response event : ', data);
    });
  }

  addListners = () => {
    SocketIO.getInstance().requestOnSuccess(
      'connect_error',
      SocketIO.getInstance().connect_error,
    );
    SocketIO.getInstance().requestOnSuccess(
      'connect_timeout',
      SocketIO.getInstance().connect_timeout,
    );
    SocketIO.getInstance().requestOnSuccess(
      'error',
      SocketIO.getInstance().error,
    );
    SocketIO.getInstance().requestOnSuccess(
      'disconnect',
      SocketIO.getInstance().disconnect,
    );
    SocketIO.getInstance().requestOnSuccess(
      'reconnect',
      SocketIO.getInstance().reconnect,
    );
    SocketIO.getInstance().requestOnSuccess(
      'reconnect_attempt',
      SocketIO.getInstance().reconnect_attempt,
    );
    SocketIO.getInstance().requestOnSuccess(
      'reconnecting',
      SocketIO.getInstance().reconnecting,
    );
    SocketIO.getInstance().requestOnSuccess(
      'reconnect_error',
      SocketIO.getInstance().reconnect_error,
    );
    SocketIO.getInstance().requestOnSuccess(
      'reconnect_failed',
      SocketIO.getInstance().reconnect_failed,
    );
  };

  connect_error = error => {
    console.log('connect_error to the socket.io', error);
  };
  connect_timeout = timeout => {
    console.log('connect_timeout to the socket.io', timeout);
  };
  error = error => {
    console.log('error to the socket.io', error);
  };
  disconnect = reason => {
    console.log('disconnect to the socket.io', reason);

    // SocketIO.getInstance().socketInstance.removeAllListeners(
    //   EVENTS.RECEIVED_MESSAGE,
    // );
    // SocketIO.getInstance().socketInstance.removeAllListeners('disconnect');

    //if (reason === 'io server disconnect') {
    // the disconnection was initiated by the server, you need to reconnect manually
    //SocketIO.getInstance().socketInstance.connect();
    //}
    // if (this.socket) this.socket.disconnect();
  };
  reconnect = attemptNumber => {
    console.log('reconnect to the socket.io', attemptNumber);
  };
  reconnect_attempt = attemptNumber => {
    console.log('reconnect_attempt to the socket.io', attemptNumber);
  };
  reconnecting = attemptNumber => {
    console.log('reconnecting to the socket.io', attemptNumber);
  };
  reconnect_error = error => {
    console.log('reconnect_error to the socket.io', error);
  };
  reconnect_failed = () => {
    console.log('reconnect_failed to the socket.io');
  };
  requestDisconnect = () => {
    /*
    if (
      SocketIO.getInstance().socketInstance !== null &&
      SocketIO.getInstance().socketInstance !== undefined
    ) {
      SocketIO.getInstance().socketInstance.disconnect();
      console.log(
        'disconnected-socket ',
        SocketIO.getInstance().socketInstance,
      );
    } else {
      console.log('Can not disconnect');
    }
    */
  };

  resetIsReceivedMessageListenerLock = () => {
    isReceivedMessageListenerInitialized = false;
  };

  getIsReceivedMessageListenerLockStatus = () =>
    isReceivedMessageListenerInitialized;

  closeSocket = () => {
    if (
      SocketIO.getInstance().socketInstance !== null &&
      SocketIO.getInstance().socketInstance !== undefined
    )
      SocketIO.getInstance().socketInstance.close();
  };

  /*
  listen to an event
  */
  listen = (eventName, onSuccess) => {
    if (
      SocketIO.getInstance().socketInstance &&
      SocketIO.getInstance().socketInstance.connected
    ) {
      SocketIO.getInstance().socketInstance.on(eventName, data => {
        if (data.code === 200) {
          onSuccess?.(data?.data, data?.message);
        } else if (data.code === 400 || data.code === 401) {
          this.checkError(data);
        }
      });
    }
  };

  /*
  release an event
  */
  emit = (eventName, args, onSuccess) => {
    if (
      SocketIO.getInstance().socketInstance &&
      SocketIO.getInstance().socketInstance.connected
    ) {
      global.log({
        eventName,
        args,
        onSuccess,
        inst: SocketIO.getInstance().socketInstance,
      });
      SocketIO.getInstance().socketInstance.emit(eventName, args, data => {
        if (data.code === 200) {
          onSuccess?.(data?.data, data?.message);
        } else if (data.code === 400 || data.code === 401) {
          this.checkError(data);
        }
      });
    }
  };

  checkError = error => {
    var showError = error.message;
    if (error.data) {
      data = error.data;
      if (Array.isArray(data)) {
        data = error.data[0];
      }
      var values = Object.keys(data).map(key => {
        return data[key];
      });
      showError = '• ' + values.join('\n• ');
    }
    FlashMessage({
      message: showError,
    });
    // return error.data;
  };

  requestOnSuccess = (event, success) => {
    console.log('requestOnSuccess--', event);
    if (SocketIO.getInstance().socketInstance !== null) {
      SocketIO.getInstance().socketInstance.on(event, data => {
        success(data.data);
      });
    }
  };
}
