//
//  ActionTypes.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:06:43 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const CANCEL = 'CANCEL';
const ADD = 'ADD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const REPLACE = 'REPLACE';
function createRequestTypes(base) {
  const res = {};
  res['BASE'] = base;
  [
    REQUEST,
    SUCCESS,
    FAILURE,
    CANCEL,
    CREATE,
    UPDATE,
    DELETE,
    ADD,
    REPLACE,
  ].forEach(type => {
    if (type === REQUEST) {
      res[type] = `${GENERAL_ACTION}`;
    } else res[type] = `${base}_${type}`;
  });
  return res;
}
//DEFAULT ACTIONS
export const GENERAL_ACTION = 'GENERAL_ACTION';
export const GENERAL_ACTION_MULTIPLE_REQUEST =
  'GENERAL_ACTION_MULTIPLE_REQUEST';
export const NO_INTERNET = 'NO_INTERNET';
//SOCKET DEFAULT ACTIONS
export const SOCKET_INFO = createRequestTypes('SOCKET_INFO');
export const SOCKET_DUMP = createRequestTypes('SOCKET_DUMP');
export const SOCKET_WRITE = 'SOCKET_WRITE';
//NETWORK DEFAULT ACTION
export const NETWORK_INFO = 'NETWORK_INFO';
//LOCATION ACTIONS
export const USER_LOCATION = createRequestTypes('USER_LOCATION');
//APP GENERAL ACTIONS

export const DUMP = createRequestTypes('DUMP');
export const CATEGORY = createRequestTypes('CATEGORY');
export const USER = createRequestTypes('USER');
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');
export const BOOKING_HISTORY = createRequestTypes('BOOKING_HISTORY');
export const BOOKING_SCHEDULED = createRequestTypes('BOOKING_SCHEDULED');
export const BOOKING_DETAILS = createRequestTypes('BOOKING_DETAILS');
export const LOGOUT = 'LOGOUT';
export const IS_ONLINE = 'IS_ONLINE';
//APP RELATED ACTIONS
//ADD HERE
