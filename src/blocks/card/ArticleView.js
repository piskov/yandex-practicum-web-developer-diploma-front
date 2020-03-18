import BaseView from '../../js/view/BaseView';
import ArticleViewModel from '../../js/view-model/ArticleViewModel';

import { changeInputEnabledState } from '../../js/tools/validation-helper';
import updateElementVisiblity from '../../js/tools/updateElementVisiblity';


/**
 * Describes a view for a news article.
 */
export default class ArticleView extends BaseView {
  /**
     * Inits new instance of the article view.
     * @param {ArticleViewModel} dataContext Underlying VM.
     * @param {HTMLElement} htmlMarkup Html markup for the view.
     */
  constructor(dataContext, htmlMarkup) {
    super(dataContext, htmlMarkup);

    this._busyIndicator = this._htmlMarkup.querySelector('.preloader');
    super.subscribeToVmPropertyChanged(this._onVmPropertyChanges.bind(this));

    this._bindMarkupToDataContext();
  }


  //#region ------ Event handlers ------

  /**
   * Handles UI updates on VM property changes.
   * @param {string} propertyName Name of the changed VM property.
   */
  _onVmPropertyChanges(propertyName) {
    switch (propertyName) {
      case 'isBusy':
        this._updateBusyIndicatorVisibility(this._dataContext.isBusy);
        break;

      default:
        break;
    }
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Transfers values from datacontext to view’s markup.
   */
  _bindMarkupToDataContext() {
    /**
     * @type {ArticleViewModel}
     */
    const data = super.dataContext;
    const ui = super.htmlMarkup;

    const link = ui.querySelector('.card__link');
    link.setAttribute('href', data.url);

    const date = ui.querySelector('.card__date');
    date.textContent = data.publishedAt;

    const title = ui.querySelector('.card__title');
    title.textContent = data.title;

    const textPreview = ui.querySelector('.card__text');
    textPreview.textContent = data.description;

    const newsSource = ui.querySelector('.card__source');
    newsSource.textContent = data.source;

    if (data.urlToImage) {
      const image = ui.querySelector('.card__image');
      image.style.backgroundImage = `url(${data.urlToImage})`;
    }
  }

  /**
   * Updates visibility of “busy” indicator.
   * @param {boolean} isBusy
   */
  _updateBusyIndicatorVisibility(isBusy) {
    const button = this._deleteButton || this._bookmarkButton;
    changeInputEnabledState(button, !isBusy);

    updateElementVisiblity(this._busyIndicator, isBusy, 'preloader_is-hidden');
  }

  //#endregion
}
