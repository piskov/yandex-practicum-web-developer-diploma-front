import BaseViewModel from '../view-model/BaseViewModel';


/**
 * Basic view.
 */
export default class BaseView {
  /**
   * Inits new instance of the view.
   * @param {BaseViewModel} dataContext Underlying VM.
   * @param {HTMLElement} htmlMarkup Html markup for the view.
   */
  constructor(dataContext, htmlMarkup) {
    this._dataContext = dataContext;
    this._htmlMarkup = htmlMarkup;
  }


  //#region ------ Properties ------

  /**
   * Underlying VM.
   * @type {BaseViewModel}
   */
  get dataContext() {
    return this._dataContext;
  }

  /**
   * Html markup for the view.
   * @type {HTMLElement}
   */
  get htmlMarkup() {
    return this._htmlMarkup;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    this._dataContext.onCleanup = null;
    this._dataContext.onNotifyPropertyChanged = null;
    this._dataContext.onObservableCollectionItemAdded = null;

    this._dataContext = null;

    this._htmlMarkup.remove();
  }

  /**
   * Subscribes to VM’s clean-up event.
   */
  subscribeToCleanup(callback) {
    this._dataContext.onCleanup = callback;
  }

  /**
   * Subscribes to VM’s collection item added notifications.
   */
  subscribeToVmCollectionItemAdded(callback) {
    this._dataContext.onObservableCollectionItemAdded = callback;
  }

  /**
   * Subscribes to VM’s property change notifications.
   */
  subscribeToVmPropertyChanged(callback) {
    this._dataContext.onNotifyPropertyChanged = callback;
  }

  //#endregion
}
