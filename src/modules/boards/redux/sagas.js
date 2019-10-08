import {
  FETCH_BOARDS_DATA,
  FETCH_BOARD_DATA,
  FETCH_BOARD_LISTS_DATA,
  FETCH_BOARD_SETTINGS_DATA,
  UPDATE_BOARD_SETTINGS_DATA,
  boardsActions,
  FETCH_ME
} from './actions';
import { all, take, put, select } from 'redux-saga/effects';
import { apiSaga } from 'base/api/redux';
import { SUCCESS } from 'base/redux/consts';

function* updateSettingsSaga() {
  while (true) {
    yield take(UPDATE_BOARD_SETTINGS_DATA + SUCCESS);
    const id = yield select((state) => state.boards.board.users.data.id);
    yield put(boardsActions.fetchOne(id));
    yield put(boardsActions.fetchLists(id));
    yield put(boardsActions.fetchSettings(id));
  }
}

export function* boardsSaga() {
  yield all([
    apiSaga(FETCH_BOARDS_DATA)(),
    apiSaga(FETCH_BOARD_DATA)(),
    apiSaga(FETCH_BOARD_LISTS_DATA)(),
    apiSaga(FETCH_BOARD_SETTINGS_DATA)(),
    apiSaga(UPDATE_BOARD_SETTINGS_DATA)(),
    apiSaga(FETCH_ME)(),
    updateSettingsSaga()
  ]);
}
