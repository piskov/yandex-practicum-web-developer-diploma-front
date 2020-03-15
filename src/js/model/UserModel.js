import ExplorerApi from '../api/ExplorerApi';
import OperationResult from '../tools/OperationResult';
import UserDto from '../dto/UserDto';

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
   * Indicates whether user is logged-in.
   * @type {boolean}
   */
  get isLoggedIn() {
    return this._isLoggedIn;
  }

  /**
   * User’s first name.
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
   * Callback to be fired on name load operation completion.
   */
  get onNameLoadCompleted() {
    return this._onNameLoadCompleted;
  }

  /**
   * Callback to be fired on name load operation completion.
   */
  set onNameLoadCompleted(value) {
    this._onNameLoadCompleted = value;
  }


  /**
   * Callback to be fired on sign-up operation completion.
   */
  get onSignUpCompleted() {
    return this._onSignUpCompleted;
  }

  /**
   * Callback to be fired on sign-up operation completion.
   */
  set onSignUpCompleted(value) {
    this._onSignUpCompleted = value;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Creates a load user’s name request to the Explorer API.
   *
   * @param {boolean} shouldLogOutOnUnauthorized
   */
  loadNameAsync(shouldLogOutOnUnauthorized = true) {
    const result = new OperationResult();

    return this._explorerApi.getProfileAsync()
      .then(jsonData => {
        // we also use this method on startup as a check-up for authentication
        if (!this._isLoggedIn) {
          this._isLoggedIn = true;

          if (this._onLoginCompleted) {
            const loginResult = new OperationResult();
            loginResult.data = this._isLoggedIn;
            this._onLoginCompleted(loginResult);
          }
        }

        this._name = jsonData.data.name;

        result.data = this._name;
        return result;
      })
      .catch(error => {
        if (error.statusCode === 401
          && shouldLogOutOnUnauthorized) {
          this.logout();
          return;
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
   * Creates a sign-in request to the Explorer API.
   * @param {{email: string, password: string, name: string}} credentials
   */
  signUpAsync(credentials) {
    const result = new OperationResult();

    const { name, email, password } = credentials;
    const dto = new UserDto(name, email, password);

    return this._explorerApi.signUpAsync(dto)
      .then(() => {
        result.data = true;
      })
      .catch(error => {
        result.error = error;
      })
      .finally(() => {
        if (this._onSignUpCompleted) {
          this._onSignUpCompleted(result);
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
