import { apiAction } from 'base/api/redux';
import { apiUrls } from 'base/api/urls';
import { resolveUrl } from 'base/utils';

export const FETCH_BOARDS_DATA = 'FETCH_BOARDS_DATA';
export const FETCH_BOARD_DATA = 'FETCH_BOARD_DATA';
export const FETCH_BOARD_BY_DATE = 'FETCH_BOARD_BY_DATE';
export const FETCH_BOARD_LISTS_DATA = 'FETCH_BOARD_LISTS_DATA';
export const FETCH_BOARD_SETTINGS_DATA = 'FETCH_BOARD_SETTINGS_DATA';
export const UPDATE_BOARD_SETTINGS_DATA = 'UPDATE_BOARD_SETTINGS_DATA';
export const FETCH_ME = 'FETCH_ME';

export const boardsActions = {
  fetchAll: () => apiAction(FETCH_BOARDS_DATA, apiUrls.BOARDS.ALL),
  fetchOne: (id, from = null, to = null) => apiAction(
    FETCH_BOARD_DATA,
    resolveUrl(apiUrls.BOARDS.ONE.BASE, { id }, from && { range: { from, to } })
  ),
  fetchLists: (id) => apiAction(FETCH_BOARD_LISTS_DATA, resolveUrl(apiUrls.BOARDS.ONE.LISTS, { id })),
  fetchSettings: (id) => apiAction(FETCH_BOARD_SETTINGS_DATA, resolveUrl(apiUrls.BOARDS.ONE.SETTINGS, { id })),
  updateSettings: (id, options) => apiAction(
    UPDATE_BOARD_SETTINGS_DATA,
    resolveUrl(apiUrls.BOARDS.ONE.SETTINGS, { id }),
    'PUT',
    options
  ),
  fetchMe: () => apiAction(FETCH_ME, apiUrls.USER)
};
