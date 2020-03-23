/**
 * Updates visibility of the element.
 * @param {HTMLElement} element
 * @param {boolean} isVisible
 * @param {string} classForIsHidden - CSS class name to hide the element.
 */
export default function updateElementVisiblity(element, isVisible, classForIsHidden) {
  isVisible ? element.classList.remove(classForIsHidden)
    : element.classList.add(classForIsHidden);
}
