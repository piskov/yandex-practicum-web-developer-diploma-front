import PopupView from './PopupView';
import PopupViewModel from '../../js/view-model/PopupViewModel';


/**
 * Describes a view for a login popup.
 */
export default class LoginPopupView extends PopupView {
  /**
     * Inits new instance of the login popup view.
     * @param {PopupViewModel} dataContext Underlying VM.
     */
  constructor(dataContext) {
    const loginPopup = document.querySelector('#login-popup');
    const form = loginPopup.querySelector('.popup__form');
    super(dataContext, loginPopup, form);

    super.subscribeToCleanup(this._onVmCleanup.bind(this));
    this._subscribeToUiEvents();
  }


  //#region ------ Event handlers ------

  /**
   * Handles form submit event
   */
  _onFormSubmit(event) {
    event.preventDefault();

    const credentials = {
      email: this._form.elements.email.value,
      password: this._form.elements.password.value,
    };

    super.dataContext.submitCommand(credentials);
  }

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    this._unsubscribeFromUiEvents();
    super._onVmCleanup();
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._form.addEventListener('submit', this._onFormSubmit);

    super._subscribeToUiEvents();
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    this._form.removeEventListener('submit', this._onFormSubmit);
  }

  //#endregion
}
