import NetworkError from '../error/NetworkError';

import logout from './logout';


/**
 * Helper method to extract additional error info from the response body.
 *
 * @param {Response} response
 * Response object.
 *
 * @param {string} errorTextPrefix
 * Error text prefix to be shown in output.
 *
 * @param {boolean} isLogoutEnabled
 * Indicates whether app shoud log out on 401 code. Default is false.
 */
export default function parseErrorBodyAsync(response, errorTextPrefix,
  isLogoutEnabled = false) {
  if (isLogoutEnabled
    && response.status === 401) {
    logout();
    return;
  }

  const errorMessage = `${errorTextPrefix}: ${response.status}, ${response.statusText}`;

  const error = new NetworkError(errorMessage, response.status, response.statusText);

  return response.json() // try to parse error json (if any)
    .then(data => {
      error.serverMessage = data.message;

      return Promise.reject(error);
    })
    .catch(error => Promise.reject(error));
}
