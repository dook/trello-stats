import { REQUEST } from 'base/redux/consts';

/**
 * Action creator generates action for an API request.
 * @param {string} type - The type of the action.
 * @param {string} endpoint - The endpoint URL.
 * @param {string} method - The type of the HTTP request method (GET, POST, etc.).
 * @param {Object} [options] - Additional things which may extend the action.
 * @param {Object} [options.payload] - The payload data sending to API.
 * @param {function} [options.afterSagaSuccess] - The generator function that will be call after success in saga.
 */
export const apiAction = (type, endpoint, method, options) => {
  return {
    type: type + REQUEST,
    endpoint,
    method,
    payload: options && options.payload,
    afterSagaSuccess: options && options.afterSagaSuccess
  };
};
