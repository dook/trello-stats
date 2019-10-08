import { TOKEN } from 'consts';
import { SIGN_OUT, SET_TOKEN } from './actions';
import { REQUEST } from 'base/redux/consts';

const initialState = {
  isAuthenticated: !!localStorage.getItem(TOKEN),
  token: null
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: !!action.token,
        token: action.token
      };
    case SIGN_OUT + REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        token: null
      };
    default:
      return state;
  }
};
