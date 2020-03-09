import generateGuid from '../tools/guid-helper';


/**
 * Describes a news article.
 */
export default class ArticleModel {
  /**
   * Inits new instance of the Article model.
   * @param {string} keyword News search tag.
   * @param {string} title Arctile’s title.
   * @param {string} description Arctile’s shortened text.
   * @param {string} publishedAt Publish date ISO string.
   * @param {string} source Article’s news site name.
   * @param {string} url URL to article’s origin.
   * @param {string} urlToImage URL to article’s image preview.
   * @param {string} isSaved Indicates whether article is saved into user’s colleciton.
   * @param {string} serverArticleId Article’s id on the server.
   */
  constructor(keyword, title, description, publishedAt, source, url, urlToImage,
    isSaved = false, serverArticleId = null) {
    this.description = description;
    this.keyword = keyword;
    this.publishedAt = publishedAt;
    this.source = source;
    this.title = title;
    this.url = url;
    this.urlToImage = urlToImage;

    this._isSaved = isSaved;
    this._serverArticleId = serverArticleId;

    this._articleId = generateGuid();
  }


  //#region ------ Properties ------

  /**
   * Article’s id (for internal use).
   * @type {string}
   */
  get articleId() {
    return this._articleId;
  }


  /**
   * Indicates whether article is stored in the user’s personal colleciton.
   * @type {boolean}
   */
  get isSaved() {
    return this._isSaved;
  }

  /**
   * Indicates whether article is stored in the user’s personal colleciton.
   * @type {boolean}
   */
  set isSaved(value) {
    if (this._isSaved === value) {
      return;
    }

    this._isSaved = value;

    if (this._onIsSavedChanged) {
      this._onIsSavedChanged(this);
    }
  }


  /**
   * Article’s server API id in the user’s personal colleciton.
   * @type {string}
   */
  get serverArticleId() {
    return this._serverArticleId;
  }

  /**
   * Article’s server API id in the user’s personal colleciton.
   * @type {string}
   */
  set serverArticleId(value) {
    this._serverArticleId = value;
  }

  //#endregion


  //#region ------ Events ------

  /**
   * Callback to be fired on isSaved value change.
   */
  get onIsSavedChanged() {
    return this._onIsSavedChanged;
  }

  /**
   * Callback to be fired on isSaved value change.
   */
  set onIsSavedChanged(value) {
    this._onIsSavedChanged = value;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    this._onIsSavedChanged = null;
  }

  //#endregion
}
