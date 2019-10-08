import {
  FETCH_BOARDS_DATA,
  FETCH_BOARD_DATA,
  FETCH_BOARD_LISTS_DATA,
  FETCH_BOARD_SETTINGS_DATA,
  UPDATE_BOARD_SETTINGS_DATA,
  FETCH_ME
} from './actions';
import { apiReducer } from 'base/api/redux';
import { combineReducers } from 'redux';

export const boardReducers = combineReducers({
  allBoards: combineReducers({
    list: apiReducer(FETCH_BOARDS_DATA)
  }),
  board: combineReducers({
    users: apiReducer(FETCH_BOARD_DATA),
    lists: apiReducer(FETCH_BOARD_LISTS_DATA),
    settings: apiReducer(FETCH_BOARD_SETTINGS_DATA),
    updateSettings: apiReducer(UPDATE_BOARD_SETTINGS_DATA)
  }),
  user: combineReducers({
    list: apiReducer(FETCH_ME)
  })
});
