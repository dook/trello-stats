import Route from 'route-parser';
import qs from 'qs';

/**
 * Returns a path with the given parameters.
 * @param {string} pattern - The path pattern.
 * @param {Object} params - The parameters of the path.
 */
export const resolveUrl = (pattern, params, qsObj = null) => {
  const route = new Route(pattern);
  const queryString = qs.stringify(qsObj, { addQueryPrefix: true });
  return route.reverse(params) + queryString;
};

/**
 * Returns parameters from the given path.
 * @param {string} pattern - The path pattern.
 * @param {string} path - The resolved path.
 */
export const matchUrl = (pattern, path) => {
  const route = new Route(pattern);
  return route.match(path);
};
