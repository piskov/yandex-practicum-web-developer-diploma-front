import BaseViewModel from './BaseViewModel';
import NetworkError from '../error/NetworkError';
import OperationResult from '../tools/OperationResult';
import PopupViewModel from './PopupViewModel';
import UserModel from '../model/UserModel';

import errorConstants from '../constants/error-constants';
import messageConstants from '../constants/message-constants';


/**
 * Describes a VM for a user.
 */
export default class UserViewModel extends BaseViewModel {
  /**
   * Inits new instance of the user view model.
   * @param {UserModel} model Underlying model.
   * @param {PopupViewModel} loginPopupViewModel Login popup VM.
   */
  constructor(model, loginPopupViewModel) {
    super(model);

    if (loginPopupViewModel) {
      this._loginPopupViewModel = loginPopupViewModel;
      this._loginPopupViewModel.onFormSubmit = this._onLoginFormSubmitHandler.bind(this);
    }

    model.onLoginCompleted = this._onLoginCompletedHandler.bind(this);
    model.onNameLoadCompleted = this._onNameLoadCompletedHandler.bind(this);
  }


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

  //#endregion


  //#region ------ Commands ------

  /**
   * “Logout” command.
   */
  logoutCommand() {
    this._model.logout();
  }

  /**
   * Shows login popup
   */
  showLoginPopupCommand() {
    this._loginPopupViewModel.isShown = true;
  }
  //#endregion


  //#region ------ Properties ------

  /**
   * Indicates whether user is logged-in.
   * @type {boolean}
   */
  get isLoggedIn() {
    return this._model.isLoggedIn;
  }

  /**
  * User’s first name.
  * @type {string}
  */
  get userFirstName() {
    return this._model.name || messageConstants.DEFAULT_LOUGOUT_MESSAGE;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    if (this._loginPopupViewModel) {
      this._loginPopupViewModel.onFormSubmit = null;
    }

    this._model.onLoginCompleted = null;
    this._model.onNameLoadCompleted = null;

    super.cleanup();
  }

  //#endregion


  //#region ------ Event handlers ------

  /**
   * Handles UserModel.onLoginCompleted event.
   * @param {OperationResult} operationResult
   */
  _onLoginCompletedHandler(operationResult) {
    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('isLoggedIn');
    }

    this._updateLoginPopup(operationResult.error);

    if (operationResult.error === null) {
      if (this._onLoginCompleted) {
        this._onLoginCompleted();
      }

      this._model.loadNameAsync();
    }
  }

  /**
   * Handles login form submit event.
   * @param {{email: string, password: string}} credentials
   */
  _onLoginFormSubmitHandler(credentials) {
    this._model.loginAsync(credentials.email, credentials.password);
  }

  /**
   * Handles UserModel.onNameLoadCompleted event.
   * @param {OperationResult} operationResult
   */
  _onNameLoadCompletedHandler(operationResult) {
    if (this.isLoggedIn
      && operationResult.error !== null) {
      alert(errorConstants.HUMAN_READABLE_LOAD_NAME_ERROR);
      return;
    }

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('userFirstName');
    }
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Updates login popup.
   * @param {NetworkError} error
   */
  _updateLoginPopup(error) {
    if (!this._loginPopupViewModel) {
      return;
    }

    this._loginPopupViewModel.isBusy = false;

    if (!error) {
      this._loginPopupViewModel.isShown = false;
      return;
    }

    let errorMessage = errorConstants.HUMAN_READABLE_GENERIC_ERROR;
    if (error.statusCode === 401) {
      errorMessage = errorConstants.HUMAN_READABLE_INVALID_USERNAME_OR_PASSWORD_ERROR;
    }

    this._loginPopupViewModel.errorMessage = errorMessage;
  }

  //#endregion
}
