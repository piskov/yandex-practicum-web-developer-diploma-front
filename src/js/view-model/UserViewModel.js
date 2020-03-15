import BaseViewModel from './BaseViewModel';
import OperationResult from '../tools/OperationResult';
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
   */
  constructor(model) {
    super(model);

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
   * “Log-in’ command.
   */
  loginCommand() {
    // this._model.loginAsync(usernmaer password);
  }

  /**
   * “Logout” command.
   */
  logoutCommand() {
    this._model.logout();
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

    if (operationResult.error === null) {
      if (this._onLoginCompleted) {
        this._onLoginCompleted();
      }
    }
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



  //#endregion
}
