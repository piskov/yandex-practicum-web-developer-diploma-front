import ArticleModel from '../model/ArticleModel';
import BaseViewModel from './BaseViewModel';

import convertDateToRussianString from '../tools/date-helper';


/**
 * Describes VM for a news article.
 */
export default class ArticleViewModel extends BaseViewModel {
  /**
   * Inits new instance of the Article view model.
   * @param {ArticleModel} model Underlying model.
   */
  constructor(model) {
    super(model);
  }


  //#region ------ Properties ------

  /**
   * Arctile’s shortened text.
   * @type {string}
   */
  get description() {
    return this._model.description || '';
  }


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
      super.onNotifyPropertyChanged('isSaved');
    }
  }


  /**
   * Publish date in readable format.
   * @type {string}
   */
  get publishedAt() {
    return convertDateToRussianString(this._model.publishedAt);
  }

  /**
   * Article’s news site name.
   * @type {string}
   */
  get source() {
    return this._model.source || '';
  }

  /**
   * Arctile’s title.
   * @type {string}
   */
  get title() {
    return this._model.title || '';
  }

  /**
   * URL to article’s origin.
   * @type {string}
   */
  get url() {
    return this._model.url || '';
  }

  /**
  * URL to article’s image preview.
  * @type {string}
  */
  get urlToImage() {
    return this._model.urlToImage;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    super.cleanup();
  }

  //#endregion
}
