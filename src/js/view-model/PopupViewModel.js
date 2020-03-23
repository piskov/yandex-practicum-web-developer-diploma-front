import BaseViewModel from './BaseViewModel';


/**
 * Describes VM for a popup.
 */
export default class PopupViewModel extends BaseViewModel {
  /**
   *
   * @param {PopupViewModel} pairedPopup
   * Secondary popup (if one popup can open another).
   */
  constructor(pairedPopup) {
    super(null);

    this._pairedPopup = pairedPopup;
  }


  //#region ------ Events ------

  /**
   * Callback to be fired on form submit button press.
   */
  get onFormSubmit() {
    return this._onFormSubmit;
  }

  /**
   * Callback to be fired on login operation completion.
   */
  set onFormSubmit(value) {
    this._onFormSubmit = value;
  }

  //#endregion


  //#region ------ Properties ------

  /**
   * Server error message.
   * @type {string}
   */
  get errorMessage() {
    return this._errorMessage;
  }

  /**
   * Server error message.
   * @type {string}
   */
  set errorMessage(value) {
    if (this._errorMessage === value) {
      return;
    }

    this._errorMessage = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('errorMessage');
    }
  }


  /**
   * Indicates that a long-running operation is in progress.
   * @type {boolean}
   */
  get isBusy() {
    return this._isBusy;
  }

  /**
   * Indicates that a long-running operation is in progress.
   * @type {boolean}
   */
  set isBusy(value) {
    if (this._isBusy === value) {
      return;
    }

    this._isBusy = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('isBusy');
    }
  }


  /**
   * Indicates whether popup is shown on the screen.
   * @type {boolean}
   */
  get isShown() {
    return this._isShown;
  }

  /**
   * Indicates whether popup is shown on the screen.
   * @type {boolean}
   */
  set isShown(value) {
    if (this._isShown === value) {
      return;
    }

    this._isShown = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('isShown');
    }
  }


  /**
   * Secondary popup (if one popup can open another).
   * @type {PopupViewModel}
   */
  set pairedPopup(value) {
    this._pairedPopup = value;
  }

  //#endregion


  //#region ------ Commands ------

  /**
   * Show secondary popup command.
   */
  showPairedPopupCommand() {
    if (!this._isBusy) {
      this.showPairedPopup();
    }
  }

  /**
   * Submit form data command.
   * @param {{email: string, password: string, name: string}} credentials
   */
  submitCommand(credentials) {
    this.errorMessage = '';
    this.isBusy = true;

    if (this._onFormSubmit) {
      this._onFormSubmit(credentials);
    }
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    super.cleanup();
  }

  /**
   * Shows secondary popup and hides this one.
   */
  showPairedPopup() {
    if (this._pairedPopup) {
      this.isShown = false;
      this._pairedPopup.isShown = true;
    }
  }

  //#endregion
}
