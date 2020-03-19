import BaseView from '../../js/view/BaseView'
import FormValidator from '../../js/tools/FormValidator';
import PopupViewModel from '../../js/view-model/PopupViewModel';

import messageConstants from '../../js/constants/message-constants';
import { changeInputEnabledState } from '../../js/tools/validation-helper';
import updateElementVisiblity from '../../js/tools/updateElementVisiblity';


const ESCAPE_CODE = 27;


/**
 * Describes a view for a popup.
 */
export default class PopupView extends BaseView {
  /**
     * Inits new instance of the popup view.
     * @param {PopupViewModel} dataContext Underlying VM.
     * @param {HTMLElement} htmlMarkup Html markup for the view.
     * @param {HTMLFormElement} form Html form.
     */
  constructor(dataContext, htmlMarkup, form) {
    super(dataContext, htmlMarkup);

    super.subscribeToCleanup(this._onVmCleanup.bind(this));
    super.subscribeToVmPropertyChanged(this._onVmPropertyChanges.bind(this));

    if (form) {
      this._form = form;

      // Yes, we need to create FormValidator exatly here,
      // yes, it’s needed to bee tightly coupled to the view,
      // you cannot separate FormValidator from the form that is
      // defined only in consturctor in runtime
      this._formValidator = new FormValidator(form);

      this._submitButtonNormalText = this._formValidator.submitButton.textContent;
      this._submitErrorMessage = document.querySelector(`#error-${form.name}`);
    }

    this._showPairedPopupButton = super.htmlMarkup.querySelector('.popup__textual-button');

    this._onPopupDeviceEvent = this._onPopupDeviceEvent.bind(this);
    this._onShowPairedPopupClick = this._onShowPairedPopupClick.bind(this);
    this._subscribeToUiEvents = this._subscribeToUiEvents.bind(this);
    this._unsubscribeFromUiEvents = this._unsubscribeFromUiEvents.bind(this);
  }


  //#region ------ Event handlers ------

  /**
   * Handle Esc or background/close button clicks to close the popup.
   */
  _onPopupDeviceEvent(event) {
    if (super.dataContext.isBusy) {
      return;
    }

    if (event
      && (event.keyCode === ESCAPE_CODE
        || event.target.classList.contains('popup')
        || event.target.classList.contains('popup__close'))) {
      super.dataContext.isShown = false;
      this._unsubscribeFromUiEvents();
    }
  }

  /**
   * Handles show secondary popup button click.
   */
  _onShowPairedPopupClick() {
    super.dataContext.showPairedPopupCommand();
  }

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    if (this._formValidator) {
      this._formValidator.cleanup();
    }

    this._unsubscribeFromUiEvents();
    super.cleanup();
  }

  /**
   * Handles UI updates on VM property changes.
   * @param {string} propertyName Name of the changed VM property.
   */
  _onVmPropertyChanges(propertyName) {
    switch (propertyName) {
      case 'errorMessage':
        if (this._submitErrorMessage) {
          this._submitErrorMessage.textContent = super.dataContext.errorMessage;
        }
        break;

      case 'isBusy':
        const isBusy = super.dataContext.isBusy;
        this._setFormBusyState(isBusy);
        changeInputEnabledState(this._showPairedPopupButton, !isBusy);
        break;

      case 'isShown':
        this._updatePopupVisibility(super.dataContext.isShown);
        break;

      default:
        break;
    }
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Clears form inputs and resets errors
   */
  _resetForm() {
    if (!this._form) {
      return;
    }

    this._submitErrorMessage.textContent = '';
    this._setFormBusyState(false);
    this._form.reset();
    this._formValidator.resetErrors();
  }

  /**
   * Enables or disables form inputs on isBusy.
   * @param {boolean} isBusy
   */
  _setFormBusyState(isBusy) {
    if (!this._formValidator) {
      return;
    }

    this._formValidator.setFormBusyState(
      isBusy,
      messageConstants.WAIT_MESSAGE,
      this._submitButtonNormalText
    );
  }

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    super.htmlMarkup.addEventListener('click', this._onPopupDeviceEvent);
    document.addEventListener('keyup', this._onPopupDeviceEvent);

    if (this._showPairedPopupButton) {
      this._showPairedPopupButton.addEventListener('click', this._onShowPairedPopupClick);
    }
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    super.htmlMarkup.removeEventListener('click', this._onPopupDeviceEvent);
    document.removeEventListener('keyup', this._onPopupDeviceEvent);

    if (this._showPairedPopupButton) {
      this._showPairedPopupButton.removeEventListener('click', this._onShowPairedPopupClick);
    }
  }

  /**
   * Hides or show the popup.
   * @param {boolean} isVisible
   */
  _updatePopupVisibility(isVisible) {
    if (isVisible) {
      this._resetForm();
      this._subscribeToUiEvents();
    } else {
      this._unsubscribeFromUiEvents();
    }

    updateElementVisiblity(super.htmlMarkup, isVisible, 'popup_is-hidden');
  }

  //#endregion
}
