import BaseView from './BaseView';
import FormValidator from '../tools/FormValidator';
import PopupViewModel from '../view-model/PopupViewModel';

import messageConstants from '../constants/message-constants';
import updateElementVisiblity from '../tools/updateElementVisiblity';
import { changeButtonState } from '../tools/validation-helper';

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
      this._formValidator = new FormValidator(form);

      this._submitButtonNormalText = this._formValidator.submitButton.textContent;
      this._submitErrorMessage = document.getElementById(`error-${form.name}`);
    }

    this._popupCloseButton = super.htmlMarkup.querySelector('.popup__close');

    this._onPopupCloseButtonClick = this._onPopupCloseButtonClick.bind(this);
    this._onKeyPress = this._onKeyPress.bind(this);
    this._subscribeToUiEvents = this._subscribeToUiEvents.bind(this);
    this._unsubscribeFromUiEvents = this._unsubscribeFromUiEvents.bind(this);
  }


  //#region ------ Event handlers ------

  /**
   * Handle escape key press.
   */
  _onKeyPress(event) {
    if (event.keyCode === ESCAPE_CODE) {
      this._onPopupCloseButtonClick();
    }
  }

  /**
   * Handle close popup button press.
   */
  _onPopupCloseButtonClick() {
    if (super.dataContext.isBusy) {
      return;
    }

    super.dataContext.isShown = false;
    this._unsubscribeFromUiEvents();
  }

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    this._formValidator.cleanup();

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
        this._updateSubmitButton(super.dataContext.isBusy);
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
    this._updateSubmitButton(false);
    this._form.reset();
    this._formValidator.resetErrors();
  }

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    this._popupCloseButton.addEventListener('click', this._onPopupCloseButtonClick);
    document.addEventListener('keyup', this._onKeyPress);
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    this._popupCloseButton.removeEventListener('click', this._onPopupCloseButtonClick);
    document.removeEventListener('keyup', this._onKeyPress);
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

  _updateSubmitButton(isBusy) {
    const button = this._formValidator.submitButton;

    if (isBusy) {
      button.textContent = messageConstants.WAIT_MESSAGE;
    } else {
      button.textContent = this._submitButtonNormalText;
    }

    changeButtonState(button, !isBusy);
  }

  //#endregion
}
