/**
 * Enables or disables a button.
 * @param {Element} button - Button reference.
 * @param {Boolean} isEnabled - Availability state.
 */
export default function changeButtonEnabledState(button, isEnabled) {
  if (button === null) {
    return;
  }

  if (isEnabled) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', "true");
  }
}
