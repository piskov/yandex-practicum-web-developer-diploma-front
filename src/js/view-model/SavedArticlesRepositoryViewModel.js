import ArticlesRepositoryViewModel from './ArticlesRepositoryViewModel';
import SavedArticleViewModel from './SavedArticleViewModel';

import ArticleModel from '../model/ArticleModel';
import SavedArticlesRepositoryModel from '../model/SavedArticlesRepositoryModel';

import MapCollectionItemChanged from '../tools/MapCollectionItemChanged';
import OperationResult from '../tools/OperationResult';

import errorConstants from '../constants/error-constants';
import messageConstants from '../constants/message-constants';
import { getArticlesCountMessage, getKeywordList } from '../tools/keyword-stats';


/**
 * Describes a VM for a collection of saved news articles.
 */
export default class SavedArticlesRepositoryViewModel extends ArticlesRepositoryViewModel {
  /**
   * Inits new instance of the saved articles repository view model.
   * @param {SavedArticlesRepositoryModel} model Underlying model.
   */
  constructor(model) {
    super(model);

    /**
     * @type {[string]}
     */
    this._keywordList = [];

    model.onSavedArticlesChanged = this._savedArticlesChangedHandler.bind(this);
    model.onSavedArticlesLoadCompleted = this._savedArticlesLoadCompletedHandler.bind(this);
  }


  //#region ------ Properties ------

  /**
   * Message describing articles count.
   * @type {string}
   */
  get articlesCountMessage() {
    return this._articlesCountMessage || messageConstants.SAVED_ARTICLES_LOAD_MESSAGE;
  }

  /**
   * Message describing articles count.
   * @type {string}
   */
  set articlesCountMessage(value) {
    if (this._articlesCountMessage === value) {
      return;
    }

    this._articlesCountMessage = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('articlesCountMessage');
    }
  }


  /**
   * List of keywords in the user’s collection to be displayed to the user.
   * @type {boolean}
   */
  get keywordList() {
    return this._keywordList;
  }

  /**
   * List of keywords in the user’s collection to be displayed to the user.
   * @type {boolean}
   */
  set keywordList(value) {
    if (this._keywordList === value) {
      return;
    }

    this._keywordList = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('keywordList');
    }
  }


  /**
  * User’s first name.
  * @type {string}
  */
  get userFirstName() {
    return this._userFirstName;
  }

  /**
   * User’s first name.
   * @type {string}
   */
  set userFirstName(value) {
    if (this._userFirstName === value) {
      return;
    }

    this._userFirstName = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('userFirstName');
    }
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    this._model.onSavedArticlesChanged = null;
    this._model.onSavedArticlesLoadCompleted = null;

    super.cleanup();
  }

  //#endregion


  //#region ------ Event handlers ------

  /**
   * Syncs stored collection with the model on article’s removal.
   * @param {MapCollectionItemChanged} changeNotification
   */
  _savedArticlesChangedHandler(changeNotification) {
    if (changeNotification.isAdded) {
      // cards are only deleted from the saved articles pages
      return;
    } else {
      super.deleteArticle(changeNotification.key);
    }

    this._updateStats();
  }

  /**
   * Handles SavedArticlesRepositoryModel.onSavedArticlesLoadCompleted event.
   * @param {OperationResult} operationResult
   */
  _savedArticlesLoadCompletedHandler(operationResult) {
    if (operationResult.error !== null) {
      this.articlesCountMessage = errorConstants.HUMAN_READABLE_LOAD_SAVED_PAGE_ERROR;
      return;
    }

    operationResult.data.forEach(articleModel => {
      const vm = new SavedArticleViewModel(articleModel);
      super.addArticle(vm, articleModel.articleId);
    });

    this._updateStats();
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Updates statistics about user’s news collection.
   */
  _updateStats() {
    const articlesCount = this._articlesMap.size;

    this.articlesCountMessage = getArticlesCountMessage(this.userFirstName, articlesCount);
    this.keywordList = getKeywordList([...this._articlesMap.values()]);
    super.hasArticles = articlesCount > 0;
  }

  //#endregion
}
