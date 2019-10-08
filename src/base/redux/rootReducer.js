import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { auth } from 'modules/auth/redux/reducers';
import { boardReducers } from 'modules/boards/redux/reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  boards: boardReducers
});
