import * as ValidationHelper from './validation-helper.js';

/**
 * Describes a form validator object.
 */
export default class FormValidator {
  /**
   * Inits a validator for the form.
   * @param {HTMLFormElement} form - Form to validate.
   */
  constructor(form) {
    this._form = form;

    this._inputs = [];
    this._submitButton = null;

    for (let item of [...form.elements]) {
      if (item.type === "submit") {
        this._submitButton = item;
      } else {
        this._inputs.push(item);
      }
    }

    this._subscribeToUiEvents();
  }


  //#region ------ Properties ------

  /**
   * Form’s submit button.
   */
  get submitButton() {
    return this._submitButton;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Deletes all error messages and updates submit button state.
   */
  resetErrors() {
    for (let input of this._inputs) {
      const errorSpanId =
        ValidationHelper.getErrorElementId(this._form.name, input.name);

      ValidationHelper.showError('', errorSpanId);
    }

    this._updateSubmitButtonState();
  }

  //#endregion


  //#region ------ Event handlers ------
  /**
     * Checks element’s validity, displays custom error and disables
     * submit button if necessary.
     */
  _onInputContentChanged(inputEvent) {
    const input = inputEvent.target;
    if (input === undefined) {
      return;
    }

    const validationResult = input.validity;

    const errorSpanId =
      ValidationHelper.getErrorElementId(this._form.name, input.name);

    const errorMessage =
      ValidationHelper.getErrorMessage(validationResult, input.name);

    ValidationHelper.showError(errorMessage, errorSpanId);

    this._updateSubmitButtonState();
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    if (!this._inputs) {
      return;
    }

    this._onInputContentChanged = this._onInputContentChanged.bind(this);

    this._inputs.forEach(input =>
      input.addEventListener('input', this._onInputContentChanged)
    );
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    if (!this._inputs) {
      return;
    }

    this._inputs.forEach(input =>
      input.removeEventListener('input', this._onInputContentChanged)
    );
  }

  /**
   * Enables/disables submit button based on the form’s validity.
   */
  _updateSubmitButtonState() {
    if (this._submitButton === null) {
      return;
    }

    let isFormValid = true;

    for (let input of this._inputs) {
      if (!input.validity.valid) {
        isFormValid = false;
        break;
      }
    }

    ValidationHelper.changeButtonState(this._submitButton, isFormValid);
  }

  //#endregion
}
