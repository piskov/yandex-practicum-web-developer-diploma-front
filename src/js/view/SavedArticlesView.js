import BaseView from './BaseView';
import SavedArticleView from './SavedArticleView';

import SavedArticlesRepositoryViewModel from '../view-model/SavedArticlesRepositoryViewModel';
import SavedArticleViewModel from '../view-model/SavedArticleViewModel';


/**
 * Describes a view for a collection of saved news articles.
 */
export default class SavedArticlesView extends BaseView {
  /**
   * Inits new instance of the saved articles view.
   * @param {SavedArticlesRepositoryViewModel} dataContext Underlying VM.
   */
  constructor(dataContext) {
    super(dataContext, document.querySelector('.cards-container'));

    super.subscribeToCleanup(this._onVmCleanup.bind(this));
    super.subscribeToVmPropertyChanged(this._onVmPropertyChanges.bind(this));
    super.subscribeToVmCollectionItemAdded(this._onVmCollectionItemAdded.bind(this));

    this._articlesCountMessage = document.querySelector('.cards-summary__title');
    this._articlesSection = document.querySelector('.saved-cards');
    this._keywordsMessage = document.querySelector('.cards-summary__keywords-info');
  }


  //#region ------ Event handlers ------

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    super.cleanup();
  }

  /**
   * Handles articles adding to the UI.
   * @param {SavedArticleViewModel} addedItem Added article VM.
   */
  _onVmCollectionItemAdded(addedItem) {
    const articleUi = new SavedArticleView(addedItem);
    super.htmlMarkup.append(articleUi.htmlMarkup);
  }

  /**
   * Handles UI updates on VM property changes.
   * @param {string} propertyName Name of the changed VM property.
   */
  _onVmPropertyChanges(propertyName) {
    switch (propertyName) {
      case 'articlesCountMessage':
        this._updateArticlesCountMessage(this._dataContext.articlesCountMessage);
        break;

      case 'hasArticles':
        this._updateArticlesContainerVisiblity(this._dataContext.hasArticles);
        break;

      case 'keywordList':
        this._updateKeywordsMessage(this._dataContext.keywordList);
        break;

      default:
        break;
    }
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Updates visibility of the articles container.
   * @param {boolean} isVisible
   */
  _updateArticlesContainerVisiblity(isVisible) {
    const isHiddenClass = 'saved-cards_is-hidden';
    isVisible ? this._articlesSection.classList.remove(isHiddenClass)
      : this._articlesSection.classList.add(isHiddenClass);
  }

  /**
   * Updates number of saved articles header.
   * @param {string} message New header text.
   */
  _updateArticlesCountMessage(message) {
    this._articlesCountMessage.textContent = message;
  }

  /**
  * Updates list of saved articles’ keywords.
  * @param {[string]} message Keywords list.
  */
  _updateKeywordsMessage(keywordsList) {
    if (keywordsList.length === 0) {
      this._keywordsMessage.textContent = '';
      return;
    }

    this._keywordsMessage.textContent = 'По ключевым словам: ';

    function getSpan(text, isBold) {
      const span = document.createElement('span');
      if (isBold) {
        span.classList.add('cards-summary__keyword');
      }
      span.textContent = text;

      return span;
    }

    for (let i = 0; i < keywordsList.length; i++) {
      const isBold = true;

      const span = getSpan(keywordsList[i], isBold);
      this._keywordsMessage.append(span);

      const isLast = i + 1 === keywordsList.length;
      const isOneBeforeLast = i + 2 === keywordsList.length;

      if (isLast) {
        break;
      }

      if (isOneBeforeLast) {
        this._keywordsMessage.append(getSpan(' и ', !isBold));
        continue;
      }

      this._keywordsMessage.append(getSpan(', ', isBold));
    }
  }

  //#endregion
}
