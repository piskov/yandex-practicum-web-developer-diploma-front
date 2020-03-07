import ArticleModel from './ArticleModel';
import ExplorerApi from '../api/ExplorerApi';
import NewsApi from '../api/NewsApi';
import OperationResult from '../tools/OperationResult';
import SavedArticlesRepositoryModel from './SavedArticlesRepositoryModel';


/**
 * Describes a collection of searched news articles.
 */
export default class SearchedArticlesRepositoryModel extends SavedArticlesRepositoryModel {
  /**
   * Inits new articles repository.
   *
   * @param {ExplorerApi} explorerApi
   * Instance of News Explorer API data access layer.
   *
   * @param {NewsApi} newsApi
   * Instance of the News API data access layer.
   */
  constructor(explorerApi, newsApi) {
    super(explorerApi);

    this._newsApi = newsApi;

    this._searchPhrase = '';

    /**
     * @type {[ArticleModel]}
     */
    this._searchResults = [];
  }


  //#region ------ Properties ------

  /**
   * Gets search articles results collection.
   * @type {[ArticleModel]}
   */
  get searchResults() {
    return this._searchResults;
  }

  //#endregion


  //#region ------ Events ------

  /**
   * Callback to be fired on search operation completion.
   */
  get onSearchCompleted() {
    return this._onSearchCompleted;
  }

  /**
   * Callback to be fired on search operation completion.
   */
  set onSearchCompleted(value) {
    this._onSearchCompleted = value;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Creates a search request to the News API based on the search phrase.
   * @param {string} searchPhrase Keyword to search articles for.
   */
  searchArticlesAsync(searchPhrase) {
    this._searchResults.forEach(article => article.cleanup());
    this._searchResults = [];

    super.clearSavedArticles();

    this._searchPhrase = searchPhrase;

    const result = new OperationResult();

    return this._newsApi.searchAsync(searchPhrase)
      .then(jsonData => {
        this._searchResults = this._parseSearchArticles(jsonData);

        result.data = this._searchResults;
        return result;
      })
      .catch(error => {
        result.error = error;
        return result;
      })
      .finally(() => {
        if (this._onSearchCompleted) {
          this._onSearchCompleted(result);
        }
      });
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   *
   * Creates article models from News API JSON.
   *
   * @param jsonData {[Object]}
   * Collection of articles.
   *
   * @returns {[ArticleModel]} Parsed articles.
   * @private
   */
  _parseSearchArticles(jsonData) {
    const articles = [];

    if (jsonData === undefined
      || jsonData.articles === undefined
      || jsonData.articles.length === 0) {
      return articles;
    }

    for (let item of jsonData.articles) {
      const { title, description, url, urlToImage, publishedAt } = item;
      const source = item.source.name;

      const article = new ArticleModel(
        this._searchPhrase,
        title,
        description,
        publishedAt,
        source,
        url,
        urlToImage
      );

      articles.push(article);
      article.onIsSavedChanged = super._articleIsSavedChangedHandler.bind(this);
    }

    return articles;
  }

  //#endregion
}
