import { apiAction } from 'base/api/redux';
import { apiUrls } from 'base/api/urls';

export const SET_TOKEN = 'SET_TOKEN';
export const SIGN_OUT = 'SIGN_OUT';

export const authActions = {
  setToken: (token) => ({ type: SET_TOKEN, token }),
  signOut: () => apiAction(SIGN_OUT, apiUrls.AUTH.SIGN_OUT, 'GET')
};
