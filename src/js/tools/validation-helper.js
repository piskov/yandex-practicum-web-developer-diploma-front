import errorConstants from '../constants/error-constants';


/**
 * Enables or disables an input.
 * @param {Element} input - Input element reference.
 * @param {boolean} isEnabled - Availability state.
 */
export function changeInputEnabledState(input, isEnabled) {
  if (input == null) {
    return;
  }

  if (isEnabled) {
    input.removeAttribute('disabled');
  } else {
    input.setAttribute('disabled', "true");
  }
}

/**
 * Constructs element’s id for the specified form and control.
 * @param {string} formName - Name of the form.
 * @param {string} inputName - Name of the input control in the form.
 * @returns {string} Span id for error message.
 */
export function getErrorElementId(formName, inputName) {
  return `error-${formName}-${inputName}`;
}

/**
 * Extracts error message from the validation result.
 * @param {ValidityState} validationResult - Validation state.
 * @param {string} inputName - Input name.
 * @return {string} - Error message.
 */
export function getErrorMessage(validationResult, inputName) {
  if (validationResult === undefined) {
    return undefined;
  }

  if (validationResult.valid) {
    return '';
  }

  if (validationResult.valueMissing) {
    return errorConstants.VALIDATION_VALUE_MISSING;
  }

  if (validationResult.typeMismatch) {
    return errorConstants.VALIDATION_TYPE_MISMATCH;
  }

  if (validationResult.tooShort || validationResult.tooLong) {
    return inputName === 'password'
      ? errorConstants.VALIDATION_PASSWORD_LENGTH_MISMATCH
      : errorConstants.VALIDATION_NAME_LENGTH_MISMATCH;
  }

  return errorConstants.VALIDATION_GENERIC_ERROR;
}

/**
 * Shows error message in the specified element.
 * @param {string} errorMessage - Error text to display.
 * @param {string} errorElementId - Span id to show the error in.
 */
export function showError(errorMessage, errorElementId) {
  if (errorElementId === null
    || errorElementId === "") {
    return;
  }

  const errorLabel = document.querySelector('#' + errorElementId);
  if (errorLabel === null) {
    return;
  }

  errorLabel.textContent = errorMessage;
}
