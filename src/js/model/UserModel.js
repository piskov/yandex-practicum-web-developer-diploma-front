import ExplorerApi from '../api/ExplorerApi';
import OperationResult from '../tools/OperationResult';

import logout from '../tools/logout';


/**
 * Describes user account.
 */
export default class UserModel {
  /**
   * Inits new user model.
   *
   * @param {ExplorerApi} explorerApi
   * Instance of News Explorer API data access layer.
   */
  constructor(explorerApi) {
    this._explorerApi = explorerApi;

    this._isLoggedIn = false;

    /**
     * @type {?string}
     */
    this._name = null;
  }


  //#region ------ Properties ------

  /**
   * User’s name.
   * @type {boolean}
   */
  get isLoggedIn() {
    return this._isLoggedIn;
  }

  /**
   * User’s name.
   * @type {?string}
   */
  get name() {
    return this._name;
  }

  //#endregion


  //#region ------ Events ------

  /**
 * Callback to be fired on login operation completion.
 */
  get onLoginCompleted() {
    return this._onLoginCompleted;
  }

  /**
   * Callback to be fired on login operation completion.
   */
  set onLoginCompleted(value) {
    this._onLoginCompleted = value;
  }


  /**
   * Callback to be fired on login operation completion.
   */
  get onNameLoadCompleted() {
    return this._onNameLoadCompleted;
  }

  /**
   * Callback to be fired on login operation completion.
   */
  set onNameLoadCompleted(value) {
    this._onNameLoadCompleted = value;
  }

  //#endregion


  //#region ------ Public methods ------

  loadNameAsync() {
    const result = new OperationResult();

    return this._explorerApi.getProfileAsync()
      .then(jsonData => {
        this._name = jsonData.data.name;

        result.data = this._name;
        return result;
      })
      .catch(error => {
        if (error.statusCode === 401
          && this._isLoggedIn) {
          this._isLoggedIn = false;
        }

        result.error = error;
        return result;
      })
      .finally(() => {
        if (this._onNameLoadCompleted) {
          this._onNameLoadCompleted(result)
        }
      });
  }

  /**
   * Creates a sign-in request to the Explorer API.
   * @param {string} email User’s email.
   * @param {string} password Password.
   */
  loginAsync(email, password) {
    const result = new OperationResult();

    return this._explorerApi.loginAsync(email, password)
      .then(() => {
        this._isLoggedIn = true;
        result.data = this._isLoggedIn;
      })
      .catch(error => {
        this._isLoggedIn = false;
        result.error = error;
      })
      .finally(() => {
        if (this._onLoginCompleted) {
          this._onLoginCompleted(result);
        }
      });
  }

  /**
   * Deletes user’s auth cookie, redirects to home page.
   */
  logout() {
    logout();
  }

  //#endregion
}
