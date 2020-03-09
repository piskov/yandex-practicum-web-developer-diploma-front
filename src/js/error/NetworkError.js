export default class NetworkError extends Error {
  /**
   * Inits new instance of the NetworkError class
   * @param {string} message Error message.
   * @param {number} statusCode Error code.
   * @param {string} statusText Error message.
   */
  constructor(message, statusCode, statusText) {
    super(message);

    this._statusCode = statusCode;
    this._statusText = statusText;

    this._serverMessage = null;
  }

  //#region ------ Properties ------

  /**
   * Custom server message (if it was included in the response).
   * @type {string}
   */
  get serverMessage() {
    return this._serverMessage;
  }

  /**
   * Custom server message (if it was included in the response).
   * @type {string}
   */
  set serverMessage(value) {
    this._serverMessage = value;
  }


  /**
   * Server’s response status code.
   * @type {number}
   */
  get statusCode() {
    return this._statusCode;
  }

  /**
   * Server’s response status code.
   * @type {number}
   */
  set statusCode(value) {
    this._statusCode = statusCode;
  }


  /**
   * Server’s response status code verbal description.
   * @type {string}
   */
  get statusText() {
    return this._statusText;
  }

  /**
   * Server’s response status code verbal description.
   * @type {string}
   */
  set statusText(value) {
    this._statusText = value;
  }

  //#endregion
}
