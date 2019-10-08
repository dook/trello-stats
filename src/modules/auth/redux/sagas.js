import { push } from 'connected-react-router';
import { all, put, take } from 'redux-saga/effects';

import { appUrls } from 'urls';

import { SIGN_OUT, SET_TOKEN } from './actions';
import { TOKEN } from 'consts';
import { REQUEST } from 'base/redux/consts';

export function* signInFlow() {
  while (true) {
    const action = yield take(SET_TOKEN);
    localStorage.setItem(TOKEN, action.token);
    yield put(push(appUrls.ROOT));
  }
}

export function* signOutFlow() {
  while (true) {
    yield take(SIGN_OUT + REQUEST);
    localStorage.removeItem(TOKEN);
    yield put(push(appUrls.AUTH.SIGN_IN));
  }
}

export function* authSaga() {
  yield all([
    signInFlow(),
    signOutFlow()
  ]);
}
