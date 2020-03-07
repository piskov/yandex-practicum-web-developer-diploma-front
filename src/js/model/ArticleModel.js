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
   * @param {string} articleId Article’s id.
   */
  constructor(keyword, title, description, publishedAt, source, url, urlToImage,
    isSaved = false, articleId = null) {
    this.description = description;
    this.keyword = keyword;
    this.publishedAt = publishedAt;
    this.source = source;
    this.title = title;
    this.url = url;
    this.urlToImage = urlToImage;

    this._isSaved = isSaved;
    this._articleId = articleId;
  }


  //#region ------ Properties ------

  /**
   * Article’s id in the user’s personal colleciton.
   * @type {string}
   */
  get articleId() {
    return this._articleId;
  }

  /**
   * Article’s id in the user’s personal colleciton.
   * @type {string}
   */
  set articleId(value) {
    this._articleId = value;
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
