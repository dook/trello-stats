import { matchUrl, resolveUrl } from 'base/utils';

export const appUrls = {
  ROOT: '/',
  BOARDS: {
    LIST: '/boards/:id',
    SETTINGS: '/boards/:id/settings'
  },
  AUTH: {
    SIGN_IN: '/signin',
  }
};

export const getBackUrl = (url) => {
  if (url === appUrls.ROOT) {
    return null;
  }
  if (matchUrl(appUrls.BOARDS.LIST, url)) {
    return appUrls.ROOT;
  }
  const settingsParams = matchUrl(appUrls.BOARDS.SETTINGS, url);
  if (settingsParams) {
    return resolveUrl(appUrls.BOARDS.LIST, settingsParams);
  }
};
