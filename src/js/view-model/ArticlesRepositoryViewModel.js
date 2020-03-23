import ArticleViewModel from './ArticleViewModel';
import BaseViewModel from './BaseViewModel';

import SavedArticlesRepositoryModel from '../model/SavedArticlesRepositoryModel';
import SearchedArticlesRepositoryModel from '../model/SearchedArticlesRepositoryModel';


/**
 * Describes a VM for a collection of news articles.
 */
export default class ArticlesRepositoryViewModel extends BaseViewModel {
  /**
   * Inits new instance of the articles repository view model.
   *
   * @param {(SavedArticlesRepositoryModel|SearchedArticlesRepositoryModel)} model
   * Underlying model.
   */
  constructor(model) {
    super(model);

    /**
     * @type {Map<string, ArticleViewModel>}
     */
    this._articlesMap = new Map();

    this._hasArticles = false;

    model.onArticleBusyOperationCompleted = this._articleBusyOperationCompletedHandler.bind(this);
  }


  //#region ------ Properties ------

  /**
   * Indicates whether there’re some articles in the repository.
   * @type {boolean}
   */
  get hasArticles() {
    return this._hasArticles;
  }

  /**
   * Indicates whether there’re some articles in the repository.
   * @type {boolean}
   */
  set hasArticles(value) {
    if (this._hasArticles === value) {
      return;
    }

    this._hasArticles = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('hasArticles');
    }
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Adds article to articles collection.
   * @param {ArticleViewModel} articleViewModel Article to add.
   * @param {string} articleId Article’s id
   */
  addArticle(articleViewModel, articleId) {
    this._articlesMap.set(articleId, articleViewModel);
    this.hasArticles = this._articlesMap.size > 0;

    if (this._onObservableCollectionItemAdded) {
      // intertwine with render cycles to prevent “ui hanging” with many articles
      setTimeout(() => {
        this._onObservableCollectionItemAdded(articleViewModel);
      }, 0);
    }
  }

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    this._model.onArticleBusyOperationCompleted = null;

    this.clearArticles();

    super.cleanup();
  }


  /**
   * Disposes of articles collection.
   */
  clearArticles() {
    if (this._articlesMap.size === 0) {
      return;
    }

    for (let article of this._articlesMap.values()) {
      article.cleanup();
    }
    this._articlesMap.clear();

    this._model.clearArticles();

    this.hasArticles = false;
  }

  /**
   * Deletes article from the collection.
   * @param {string} articleId Article’s id
   */
  deleteArticle(articleId) {
    const article = this._articlesMap.get(articleId);
    article.cleanup();

    this._articlesMap.delete(articleId);
    this.hasArticles = this._articlesMap.size > 0;
  }

  //#endregion


  //#region ------ Event handlers ------

  /**
   * Handles completion of the busy network operation on the news article.
   * @param {string} articleId
   */
  _articleBusyOperationCompletedHandler(articleId) {
    const article = this._articlesMap.get(articleId);

    // articles are completely deleted on saved page, so it will be undefined there
    if (article !== undefined) {
      article.isBusy = false;
    }
  }

  //#endregion

}
