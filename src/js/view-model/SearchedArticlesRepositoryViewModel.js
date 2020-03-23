import ArticlesRepositoryViewModel from './ArticlesRepositoryViewModel';
import SearchedArticleViewModel from './SearchedArticleViewModel';
import UserViewModel from './UserViewModel';

import SearchedArticlesRepositoryModel from '../model/SavedArticlesRepositoryModel';

import OperationResult from '../tools/OperationResult';

import errorConstants from '../constants/error-constants';

const ARTICLES_NUMBER_PER_RENDER = 3;


/**
 * Describes a VM for a collection of news articles search results.
 */
export default class SearchedArticlesRepositoryViewModel extends ArticlesRepositoryViewModel {
  /**
   * Inits new instance of news articles search results repository view model.
   * @param {SearchedArticlesRepositoryModel} model Underlying model.
   * @param {UserViewModel} userViewModel
   */
  constructor(model, userViewModel) {
    super(model);

    this._userViewModel = userViewModel;

    this._isBusy = false;
    this._isMoreNewsButtonVisibile = false;
    this._isNoResultsImageVisible = false;
    this._searchErrorMessage = '';

    model.onSearchCompleted = this._searchCompletedCompletedHandler.bind(this);
    userViewModel.onLoginCompleted = this._onLoginCompletedHandler.bind(this);
  }


  //#region ------ Properties ------

  /**
    * Indicates that a long-running operation is in progress.
    * @type {boolean}
    */
  get isBusy() {
    return this._isBusy;
  }

  /**
   * Indicates that a long-running operation is in progress.
   * @type {boolean}
   */
  set isBusy(value) {
    if (this._isBusy === value) {
      return;
    }

    this._isBusy = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('isBusy');
    }
  }

  /**
    * Indicates whehter error message should be visible.
    * @type {boolean}
    */
  get isSearchErrorMessageVisible() {
    return this._searchErrorMessage !== '';
  }


  /**
    * Indicates whether “show more news” button is visible.
    * @type {boolean}
    */
  get isMoreNewsButtonVisibile() {
    return this._isMoreNewsButtonVisibile;
  }

  /**
   * Indicates whether “show more news” button is visible.
   * @type {boolean}
   */
  set isMoreNewsButtonVisibile(value) {
    if (this._isMoreNewsButtonVisibile === value) {
      return;
    }

    this._isMoreNewsButtonVisibile = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('isMoreNewsButtonVisibile');
    }
  }


  /**
   * Indicates whether “no results” image is shown.
   * @type {boolean}
   */
  get isNoResultsImageVisible() {
    return this._isNoResultsImageVisible;
  }

  /**
   * Indicates whether “no results” image is shown.
   * @type {boolean}
   */
  set isNoResultsImageVisible(value) {
    if (this._isNoResultsImageVisible === value) {
      return;
    }

    this._isNoResultsImageVisible = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('isNoResultsImageVisible');
    }
  }


  /**
    * Indicates that some error occured during the news search.
    * @type {string}
    */
  get searchErrorMessage() {
    return this._searchErrorMessage;
  }

  /**
   * Indicates that some error occured during the news search.
   * @type {string}
   */
  set searchErrorMessage(value) {
    if (this._searchErrorMessage === value) {
      return;
    }

    this._searchErrorMessage = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('searchErrorMessage');
      super.onNotifyPropertyChanged('isSearchErrorMessageVisible');
    }
  }

  //#endregion


  //#region ------ Commands ------

  /**
   * “Search for news” command.
   */
  searchCommand(searchPhrase) {
    this.isMoreNewsButtonVisibile = false;
    this.isNoResultsImageVisible = false;
    this.searchErrorMessage = '';
    this.isBusy = true;

    super.clearArticles();

    this._model.searchArticlesAsync(searchPhrase);
  }

  /**
   * Shows more news to the user from the search results.
   */
  showMoreNewsCommand() {
    if (this._articlesMap.size === this._model.searchResults.length) {
      return;
    }

    const startIndex = this._articlesMap.size;
    const endIndex = startIndex + ARTICLES_NUMBER_PER_RENDER; // zero-based

    const articlesToShow = this._model.searchResults.slice(startIndex, endIndex);
    articlesToShow.forEach(articleModel => {
      const vm = new SearchedArticleViewModel(
        articleModel,
        this._userViewModel.isLoggedIn
      );

      super.addArticle(vm, articleModel.articleId);
    });

    this.isMoreNewsButtonVisibile =
      endIndex < this._model.searchResults.length;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    this._model.onSearchCompleted = null;
    this._userViewModel.onLoginCompleted = null;
    this._userViewModel = null;

    super.cleanup();
  }

  //#endregion


  //#region ------ Event handlers ------

  /**
   * Handles UserViewModel.onLoginCompleted event.
   */
  _onLoginCompletedHandler() {
    if (this._articlesMap.size === 0) {
      return;
    }

    for (let article of this._articlesMap.values()) {
      article.hasNotLoggedInTooltip = false;
    }
  }

  /**
   * Handles SearchedArticlesRepositoryModel.onSearchCompleted event.
   * @param {OperationResult} operationResult
   */
  _searchCompletedCompletedHandler(operationResult) {
    this.isBusy = false;

    if (operationResult.error !== null) {
      this.searchErrorMessage = errorConstants.HUMAN_READABLE_SEARCH_ERROR;
      return;
    }

    this.searchErrorMessage = '';

    if (this._model.searchResults.length === 0) {
      this.isNoResultsImageVisible = true;
      return;
    }

    this.showMoreNewsCommand();
  }

  //#endregion

}
