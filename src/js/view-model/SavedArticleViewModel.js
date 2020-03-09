import ArticleModel from '../model/ArticleModel';
import ArticleViewModel from './ArticleViewModel';


/**
 * Describes a VM for an article in the saved news page.
 */
export default class SavedArticleViewModel extends ArticleViewModel {
  /**
   * Inits new instance of the saved article view model.
   * @param {ArticleModel} model Underlying model.
   */
  constructor(model) {
    super(model);
  }


  //#region ------ Properties ------

  /**
   * News search tag.
   * @type {string}
   */
  get keyword() {
    return this._model.keyword;
  }

  //#endregion


  //#region ------ Commands ------

  /**
   * Delete card command.
   */
  deleteCommand() {
    super.isBusy = true;
    this._model.isSaved = false;
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
