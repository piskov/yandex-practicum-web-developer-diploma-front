const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

/**
 * Converts date in ISO string to russian readable format.
 * @param {string} dateIsoString
 * @returns {string} Date in russian readable format
 */
export default function convertDateToRussianString(dateIsoString) {
  if (!dateIsoString) {
    return '';
  }

  const date = new Date(dateIsoString);
  return `${date.getDate()} ${MONTHS[`${date.getMonth()}`]}, ${date.getFullYear()}`;
}
