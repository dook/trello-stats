import { call, put, takeEvery } from 'redux-saga/effects';

import { request } from 'base/api';
import { REQUEST, SUCCESS, FAILURE } from 'base/redux/consts';
import { authActions } from 'modules/auth/redux/actions';

const getErrorObj = (error) => (error.response && error.response.data) || error.request || error.message;

/**
 * Method creates saga for an API request.
 * @param {string} type - The type of the action.
 */
export const apiSaga = (type) => {
  function* callApi(action) {
    try {
      const { data } = yield call(request, action.method, action.endpoint, action.payload);
      yield put({
        type: type + SUCCESS,
        data
      });
      if (action.afterSagaSuccess) {
        yield call(action.afterSagaSuccess);
      }
    } catch (err) {
      const error = getErrorObj(err);
      if (error.status === 401)  {
        yield put(authActions.signOut());
      }
      yield put({
        type: type + FAILURE,
        error
      });
    }
  }

  return function* () {
    yield takeEvery(type + REQUEST, callApi);
  };
};
