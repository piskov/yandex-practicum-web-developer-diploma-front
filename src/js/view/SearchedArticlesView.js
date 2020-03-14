import BaseView from './BaseView';
import SearchedArticleView from './SearchedArticleView';

import SearchedArticlesRepositoryViewModel from '../view-model/SearchedArticlesRepositoryViewModel';
import SearchedArticleViewModel from '../view-model/SearchedArticleViewModel';

import updateElementVisiblity from '../tools/updateElementVisiblity';


/**
 * Describes a view for a collection of news search articles.
 */
export default class SearchedArticlesView extends BaseView {
  /**
   * Inits new instance of the news search articles view.
   * @param {SearchedArticlesRepositoryViewModel} dataContext Underlying VM.
   */
  constructor(dataContext) {
    super(dataContext, document.querySelector('.cards-container'));

    super.subscribeToCleanup(this._onVmCleanup.bind(this));
    super.subscribeToVmPropertyChanged(this._onVmPropertyChanges.bind(this));
    super.subscribeToVmCollectionItemAdded(this._onVmCollectionItemAdded.bind(this));

    this._searchButton = document.querySelector('.search__button');

    this._searchResults = document.querySelector('.search-results');

    this._noResultsImage = this._searchResults.querySelector('.not-found');
    this._preloader = this._searchResults.querySelector('.search-results__preloader');
    this._showMoreResultsButton = this._searchResults.querySelector('.search-results__load-button');
    this._searchResultsError = this._searchResults.querySelector('.search-results__error');

    this._subscribeToUiEvents();
  }


  //#region ------ Event handlers ------

  /**
   * Handles “Search news” button click.
   * @param {Event} event
   */
  _onSearchButtonClick(event) {
    event.preventDefault();

    this._searchResults.classList.remove('search-results_is-hidden');
    super.dataContext.searchCommand();
  }

  /**
   * Handles “Show more news” button click.
   * @param {Event} event
   */
  _onShowMoreResultsButtonClick(event) {
    super.dataContext.showMoreNewsCommand();
  }

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    this._unsubscribeFromUiEvents();
    super.cleanup();
  }

  /**
   * Handles articles adding to the UI.
   * @param {SearchedArticleViewModel} addedItem Added article VM.
   */
  _onVmCollectionItemAdded(addedItem) {
    const articleUi = new SearchedArticleView(addedItem);
    super.htmlMarkup.append(articleUi.htmlMarkup);
  }

  /**
   * Handles UI updates on VM property changes.
   * @param {string} propertyName Name of the changed VM property.
   */
  _onVmPropertyChanges(propertyName) {
    switch (propertyName) {
      case 'isBusy':
        updateElementVisiblity(
          this._preloader,
          super.dataContext.isBusy,
          'preloader_is-hidden');
        break;

      case 'isMoreNewsButtonVisibile':
        updateElementVisiblity(
          this._showMoreResultsButton,
          super.dataContext.isMoreNewsButtonVisibile,
          'search-results__load-button_is-hidden');
        break;

      case 'isNoResultsImageVisible':
        updateElementVisiblity(
          this._noResultsImage,
          super.dataContext.isNoResultsImageVisible,
          'not-found_is-hidden');
        break;

      case 'isSearchErrorMessageVisible':
        updateElementVisiblity(
          this._searchResultsError,
          super.dataContext.isSearchErrorMessageVisible,
          'search-results__error_is-hidden');
        break;

      case 'searchErrorMessage':
        this._searchResultsError.textContent = super.dataContext.searchErrorMessage;
        break;

      default:
        break;
    }
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    this._onSearchButtonClick = this._onSearchButtonClick.bind(this);
    this._searchButton.addEventListener('click', this._onSearchButtonClick);

    this._onShowMoreResultsButtonClick = this._onShowMoreResultsButtonClick.bind(this);
    this._showMoreResultsButton.addEventListener('click', this._onShowMoreResultsButtonClick);
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    this._searchButton.removeEventListener('click', this._onSearchButtonClick);
    this._showMoreResultsButton.removeEventListener('click', this._onShowMoreResultsButtonClick);
  }

  //#endregion
}
