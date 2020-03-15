import ArticleModel from '../model/ArticleModel';
import ArticleViewModel from './ArticleViewModel';


/**
 * Describes a VM for an article in the search news page.
 */
export default class SearchedArticleViewModel extends ArticleViewModel {
  /**
   * Inits new instance of the searched article view model.
   *
   * @param {ArticleModel} model
   * Underlying model.
   *
   * @param {boolean} isUserLoggedIn
   * Indicates whether user is signed-in.
   */
  constructor(model, isUserLoggedIn) {
    super(model);

    this._hasNotLoggedInTooltip = !isUserLoggedIn;
  }


  //#region ------ Properties ------

  /**
   * Indicates whether article should indicate that user is not authenticated.
   * @type {boolean}
   */
  get hasNotLoggedInTooltip() {
    return this._hasNotLoggedInTooltip;
  }

  /**
   * Indicates whether article should indicate that user is not authenticated.
   * @type {boolean}
   */
  set hasNotLoggedInTooltip(value) {
    if (this._hasNotLoggedInTooltip === value) {
      return;
    }

    this._hasNotLoggedInTooltip = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('hasNotLoggedInTooltip');
    }
  }

  /**
   * Indicates whether article is stored in the user’s personal colleciton.
   * @type {boolean}
   */
  get isSaved() {
    return this._model.isSaved;
  }

  /**
   * Indicates whether article is stored in the user’s personal colleciton.
   * @type {boolean}
   */
  set isSaved(value) {
    if (this._model.isSaved === value
      || this._hasNotLoggedInTooltip) {
      return;
    }

    this._model.isSaved = value;

    if (super.onNotifyPropertyChanged) {
      super.onNotifyPropertyChanged('isSaved');
    }
  }

  //#endregion


  //#region ------ Commands ------

  /**
   * Toggle bookmark command.
   */
  toggleIsSavedCommand() {
    super.isBusy = true;
    this.isSaved = !this.isSaved;
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
