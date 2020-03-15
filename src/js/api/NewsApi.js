import errorConstants from '../constants/error-constants';
import parseErrorBodyAsync from '../tools/error-helper';


const API_KEY = '7f192e97d7af4ebfb14a61206ff44b23';
const BASE_ADDRESS = 'https://newsapi.org/v2/everything';
const NEWS_COUNT = 100;
const OLDEST_NEWS_DAYS_BEFORE = 7;


/**
 * Data access layer for News API.
 */
export default class NewsAPI {
  //#region ------ Public methods ------

  /**
   * Loads news json from the News API based on search phrase.
   * @param {string} searchPhrase Search phrase
   * @returns {Promise<JSON>} Awaitable object.
   */
  searchAsync(searchPhrase) {
    const requestUrl = BASE_ADDRESS + this._buildQueryParams(searchPhrase);

    return fetch(requestUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return parseErrorBodyAsync(
          response,
          errorConstants.SEARCH_ERROR_PREFIX
        );
      });
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Builds requset url query parameters.
   * @param {string} searchPhrase Search phrase.
   * @private
   */
  _buildQueryParams(searchPhrase) {
    const date = new Date();
    const toDateString = date.toISOString();

    date.setDate(date.getDate() - OLDEST_NEWS_DAYS_BEFORE);
    const fromDateString = date.toISOString();

    return `?apiKey=${API_KEY}`
      + `&pageSize=${NEWS_COUNT}`
      + `&from=${fromDateString}`
      + `&to=${toDateString}`
      + `&q=${encodeURI(searchPhrase)}`;
  }

  //#endregion
}
