import _ from 'lodash';
import singleton from '../singleton';
import {store} from '../store';
import {USER} from '../actions/ActionTypes';
import {request, generalDispatchAction} from '@serviceAction';

const callback = response => global.log({response});

const callDispatch = request => {
  const dispatch = singleton.storeRef.dispatch;
  dispatch(request);
};

const getUser = () => {
  return singleton.storeRef.getState().loginReducer.data;
};

const dispatchRequest = (
  url, //Service url
  method, //Web Service type 'post,get,put,delete....'
  data, //Paramter for request
  actionType = null, //Action Type
  showHud = true, //Show spinner
  successCB = callback,
  failureCB = callback,
) => {
  store.dispatch(
    request(url, method, data, actionType, showHud, successCB, failureCB),
  );
};

const setDriverData = data => {
  console.log('data1=======================', data);

  callDispatch(generalDispatchAction(USER.SUCCESS, data));
};

export {getUser, callDispatch, dispatchRequest, setDriverData};
