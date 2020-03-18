import ArticleView from './ArticleView';
import SearchedArticleViewModel from '../view-model/SearchedArticleViewModel';

import { changeInputEnabledState } from '../tools/validation-helper';
import updateElementVisiblity from '../tools/updateElementVisiblity';


const ARTICLE_TEMPLATE =
  document.getElementById('search-article-template')
    .content
    .querySelector('.card');


/**
 * Describes a view for a news search results article.
 */
export default class SearchedArticleView extends ArticleView {
  /**
     * Inits new instance of the search results article view.
     * @param {SearchedArticleViewModel} dataContext Underlying VM.
     */
  constructor(dataContext) {
    super(dataContext, ARTICLE_TEMPLATE.cloneNode(true));

    super.subscribeToCleanup(this._onVmCleanup.bind(this));

    this._bookmarkButton = this._htmlMarkup.querySelector('.card__bookmark-button');

    this._notLoggedInTooltip = this._htmlMarkup.querySelector('.card__tooltip');
    this._updateNotLoggedInTooltipVisibility(dataContext.hasNotLoggedInTooltip);

    this._subscribeToUiEvents();
  }


  //#region ------ Event handlers ------

  /**
   * Handles “bookmark switch” button click.
   * @param {Event} event
   */
  _onBookmarkButtonClick(event) {
    super.dataContext.toggleIsSavedCommand();
    event.stopPropagation();
  }

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    this._unsubscribeFromUiEvents();
    super.cleanup();
  }

  /**
   * Handles UI updates on VM property changes.
   * @param {string} propertyName Name of the changed VM property.
   */
  _onVmPropertyChanges(propertyName) {
    switch (propertyName) {
      case 'isSaved':
        this._updateBookmarkIcon(this._dataContext.isSaved)
        break;

      case 'hasNotLoggedInTooltip':
        this._updateNotLoggedInTooltipVisibility(this._dataContext.hasNotLoggedInTooltip);
        break;

      default:
        break;
    }

    super._onVmPropertyChanges(propertyName);
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    this._onBookmarkButtonClick = this._onBookmarkButtonClick.bind(this);
    this._bookmarkButton.addEventListener('click', this._onBookmarkButtonClick);
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    this._bookmarkButton.removeEventListener('click', this._onBookmarkButtonClick);
  }

  /**
   * Updates bookmark indicator icon.
   * @param {boolean} isMarked
   */
  _updateBookmarkIcon(isMarked) {
    const isMarkedClass = 'card__bookmark-button_state_marked';
    const isNotMarkedClass = 'card__bookmark-button_state_not-marked';

    if (isMarked) {
      this._bookmarkButton.classList.remove(isNotMarkedClass);
      this._bookmarkButton.classList.add(isMarkedClass);
    }
    else {
      this._bookmarkButton.classList.add(isNotMarkedClass);
      this._bookmarkButton.classList.remove(isMarkedClass);
    }
  }

  /**
   * Updates visibility of “you’re not logged-In” tooltip.
   * @param {boolean} isLoggedOut
   */
  _updateNotLoggedInTooltipVisibility(isLoggedOut) {
    changeInputEnabledState(this._bookmarkButton, !isLoggedOut);
    updateElementVisiblity(this._notLoggedInTooltip, isLoggedOut, 'card__tooltip_is-hidden');
  }

  //#endregion
}
