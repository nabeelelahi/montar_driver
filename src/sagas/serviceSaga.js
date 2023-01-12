import {put, call, takeEvery} from 'redux-saga/effects';
import {success, failure} from '../actions/ServiceAction';
import HttpServiceManager from '../services/HttpServiceManager';
import {GENERAL_ACTION} from '../actions/ActionTypes';

function callRequest(service, payload, service_type, showHud) {
  return HttpServiceManager.getInstance().request(
    service,
    payload,
    service_type,
    showHud,
  );
}

function* watchRequest(action) {
  const {
    payload,
    service,
    service_type,
    request_type, // action object from action file having REQUEST, SUCCESS, FAILURE
    successCB,
    failureCB,
    showHud,
    isConcat,
  } = action;

  try {
    // adding meta to the flow to handle unwanted pagination requests
    const {
      response,
      message = '',
      meta = {},
    } = yield call(callRequest, service, payload, service_type, showHud);

    successCB && successCB(response, message, meta);

    if (request_type)
      yield put(success(request_type, response, meta, isConcat));
  } catch (err) {
    failureCB && failureCB(err);
    if (request_type) yield put(failure(request_type, err));
  }
}

export default function* root() {
  yield takeEvery(GENERAL_ACTION, watchRequest);
}
