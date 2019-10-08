import axios from 'axios';
import { TOKEN } from 'consts';
import { env } from 'config';

/**
 * Creates an API request.
 * @param {string} method - The type of the HTTP request method.
 * @param {string} url - The endpoint URL.
 * @param {Object} data - The payload data.
 */
export const request = (method = 'GET', url, data) => {
  const requestConfig = {
    baseURL: env.API_URL,
    method,
    url,
    data
  };

  if (localStorage.getItem(TOKEN)) {
    requestConfig.headers = { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) };
  }

  return axios(requestConfig);
};
