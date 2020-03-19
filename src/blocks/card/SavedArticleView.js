import ArticleView from './ArticleView';
import SavedArticleViewModel from '../../js/view-model/SavedArticleViewModel';


const ARTICLE_TEMPLATE =
  document.querySelector('#saved-article-template')
    .content
    .querySelector('.card');


/**
 * Describes a view for a saved news article.
 */
export default class SavedArticleView extends ArticleView {
  /**
     * Inits new instance of the saved article view.
     * @param {SavedArticleViewModel} dataContext Underlying VM.
     */
  constructor(dataContext) {
    super(dataContext, ARTICLE_TEMPLATE.cloneNode(true));

    super.subscribeToCleanup(this._onVmCleanup.bind(this));

    this._deleteButton = this._htmlMarkup.querySelector('.card__delete-button');

    this._bindMarkupToDataContext();
    this._subscribeToUiEvents();
  }


  //#region ------ Event handlers ------

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    this._unsubscribeFromUiEvents();
    super.cleanup();
  }

  //#endregion


  //#region ------ Event handlers ------

  /**
   * Handles “Delete article” button click.
   * @param {Event} event
   */
  _onDeleteButtonClick(event) {
    super.dataContext.deleteCommand();
    event.stopPropagation();
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Transfers values from datacontext to view’s markup.
   */
  _bindMarkupToDataContext() {
    /**
     * @type {SavedArticleViewModel}
     */
    const data = super.dataContext;
    const ui = super.htmlMarkup;

    const keyword = ui.querySelector('.card__keyword');
    keyword.textContent = data.keyword;

    super._bindMarkupToDataContext();
  }

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._deleteButton.addEventListener('click', this._onDeleteButtonClick);
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    this._deleteButton.removeEventListener('click', this._onDeleteButtonClick);
  }

  //#endregion
}
