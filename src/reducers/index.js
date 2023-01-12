//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:21:40 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import {combineReducers} from 'redux';
import serviceReducer from './serviceReducer';
import isOnline from './isOnline';
import {
  LOGOUT,
  USER,
  DUMP,
  CATEGORY,
  BOOKING_DETAILS,
  BOOKING_HISTORY,
  BOOKING_SCHEDULED,
} from '../actions/ActionTypes';
const appReducer = combineReducers({
  userReducer: serviceReducer(USER),
  dumpReducer: serviceReducer(DUMP),
  category: serviceReducer(CATEGORY),
  bookingHistory: serviceReducer(BOOKING_HISTORY),
  bookingScheduled: serviceReducer(BOOKING_SCHEDULED),
  bookingDetails: serviceReducer(BOOKING_DETAILS),
  isOnline,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    let newState = {};
    for (let key of Object.keys(state)) {
      newState[key] = {
        ...state[key],
        data: [],
        meta: {current_page: 0, last_page: 0},
      };
    }
    state = {
      ...newState,
    };
  }
  return appReducer(state, action);
};

export default rootReducer;
