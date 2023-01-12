//
//  ServiceAction.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:07:24 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {
  GENERAL_ACTION,
  GENERAL_ACTION_MULTIPLE_REQUEST,
  LOGOUT,
  NO_INTERNET,
} from './ActionTypes';
import {isNetworkReachable, isConnected} from 'react-native-reachability-popup';
  
  callback = () => {};

  Request = {
    url: String, //Service url
    method: String, //Web Service type 'post,get,put,delete....'
    data: Object, //Paramter for request
    actionType: Object,
  };
  
  export function request(
    types,
    service,
    service_type,
    data,
    showHud,
    successCB = callback,
    failureCB = callback,
    referencedReducer, // key to edit isFetching of reducer
    isConcat = false,
  ) {
    return {
      payload: data,
      service,
      service_type,
      type: GENERAL_ACTION,
      request_type: types,
      showHud,
      successCB,
      failureCB,
      referencedReducer,
      isConcat,
    };
  }
  
  export function multipleRequest(
    requestArray: [Request],
    showHud = true,
    successCB = callback,
    failureCB = callback,
  ) {
    if (!isNetworkReachable() && !isConnected()) {
      return {
        type: NO_INTERNET,
      };
    }
    return {
      type: GENERAL_ACTION_MULTIPLE_REQUEST,
      requestArray,
      showHud,
      successCB,
      failureCB,
    };
  }
  export function requestAction(types) {
    return {
      type: types.REQUEST,
    };
  }
  export function success(type, data, meta, isConcat, reducerType = undefined) {
    return {
      data,
      type: type.SUCCESS,
      meta,
      isConcat,
      reducerType,
    };
  }

  export function failure(types, errorMessage) {
    return {
      errorMessage,
      type: types.FAILURE,
    };
  }

  export function generalSaveAction(type: string, data) {
    return {
      type,
      data,
    };
  }

  export function generalDispatchAction(type: string, data) {
    return {
      type,
      data,
    };
  }

  export function generalDispatchUpdate(type: string, data) {
    return {
      type,
      data,
    };
  }
  export function generalDispatchDelete(type: string, data) {
    return {
      type,
      data,
    };
  }

  export function generalDispatchType(type: string) {
    return {
      type,
    };
  }
  
  export function logout() {
    return {
      type: LOGOUT,
    };
  }
  