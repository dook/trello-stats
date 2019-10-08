import { all } from 'redux-saga/effects';

import { authSaga } from 'modules/auth/redux/sagas';
import { boardsSaga } from 'modules/boards/redux/sagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    boardsSaga()
  ]);
}
