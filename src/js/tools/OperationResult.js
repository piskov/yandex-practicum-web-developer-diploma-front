import NetworkError from '../error/NetworkError';


/**
 * Generic operation result: either contains error, or operation result.
 */
export default class OperationResult {
  constructor() {
    this._data = null;
    this._error = null;
  }


  //#region ------ Properties ------

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;

    if (value) {
      this._error = null;
    }
  }


  /**
   * Error details.
   * @type {NetworkError}
   */
  get error() {
    return this._error;
  }

  /**
   * Error details.
   * @type {NetworkError}
   */
  set error(value) {
    this._error = value;

    if (value) {
      this._data = null;
    }
  }

  //#endregion
}
