export const apiUrls = {
  AUTH: {
    SIGN_IN: '/login',
    SIGN_OUT: '/logout'
  },
  BOARDS: {
    ALL: '/boards',
    ONE: {
      BASE: '/boards/:id',
      LISTS: '/boards/:id/lists',
      SETTINGS: '/boards/:id/settings'
    }
  },
  USER: 'users/me'
};
