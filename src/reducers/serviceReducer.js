//
//  serviceReducer.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:22:21 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import * as types from '../actions/ActionTypes';
import _ from 'lodash';
import Immutable from 'seamless-immutable';

const initialState = {
  isFetching: false,
  failure: false,
  errMessage: '',
  data: [],
  meta: {},
};
let obj = {};
let temp_array = [];
export default type => {
  return (state = initialState, action) => {
    switch (action.type) {
      case type.REQUEST: {
        if (
          type.BASE &&
          action.referencedReducer &&
          type.BASE == action.referencedReducer
        ) {
          return Immutable.merge(state, {
            isFetching: true,
          });
        }
        return state;
      }

      case type.SUCCESS:
        if (action.isConcat) {
          return Immutable.merge(state, {
            failure: false,
            isFetching: false,
            errorMessage: '',
            data: _.concat(state.data, action.data),
            meta: action.meta,
          });
        }
        return Immutable.merge(state, {
          failure: false,
          isFetching: false,
          errorMessage: '',
          data: action.data,
          meta: action.meta,
        });

      case type.FAILURE:
        return Immutable.merge(state, {
          failure: true,
          isFetching: false,
          errorMessage: action.errorMessage,
        });
      case type.ADD:
        return Immutable.merge(state, {
          data: _.concat(action.data, state.data),
          isFetching: false,
        });
      case type.UPDATE:
        obj = action.data;

        temp_array = _.cloneDeep(state.data);
        var index = state.data.findIndex(item => item.id === obj.id);
        // Replace the item by index.
        temp_array.splice(index, 1, obj);
        return Immutable.merge(state, {data: temp_array});
      case type.DELETE:
        let target_data = action.data;
        const temp_data = _.cloneDeep(state.data);
        var index = state.data.findIndex(item => item.id === target_data.id);
        // remove the item by index.
        temp_data.splice(index, 1);
        return Immutable.merge(state, {data: temp_data});

      case type.REPLACE:
        return Immutable.merge(state, {data: action.data});
      default:
        return state;
    }
  };
};
const updateOperation = (state, action, type) => {
  isArray = Array.isArray(state.data);
  switch (type) {
    default:
      if (action.key && action.path) {
        return {};
      } else {
        if (isArray) {
          return {
            ...state,
            data: [...state.data, action.data],
          };
        } else {
          return {
            ...state,
            data: {...state.data, ...action.data},
          };
        }
      }
  }
};
const deleteOperation = (state, action) => {
  isArray = Array.isArray(state.data);
  if (action.key && action.where) {
    if (isArray) {
      const newData = [...state.data];
      const index = state.data.findIndex(
        item => item[action.key] === action.where,
      );
      newData.splice(index, 1);
      return {
        ...state,
        data: newData,
      };
    } else {
      return state;
    }
  } else {
    return state;
  }
};
