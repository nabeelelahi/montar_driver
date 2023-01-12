//
//  userLocation.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:22:31 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import * as types from '@actionTypes';

const initialState = {
  online: false,
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.IS_ONLINE:
      return {
        ...state,
        online: action.data,
      };

    default:
      return state;
  }
};
