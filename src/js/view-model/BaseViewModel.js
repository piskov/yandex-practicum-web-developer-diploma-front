/**
 * Basic view model.
 */
export default class BaseViewModel {
  /**
   * Inits new instance of the view model.
   * @param {*} model Underlying model.
   */
  constructor(model) {
    this._model = model;
  }
  

  //#region ------ Events ------

  /**
   * Callback to be fired on VM dispose.
   */
  get onCleanup() {
    return this._onCleanup;
  }

  /**
   * Callback to be fired on VM dispose.
   */
  set onCleanup(value) {
    this._onCleanup = value;
  }

  /**
   * Callback to be fired on VM properties value changes.
   */
  get onNotifyPropertyChanged() {
    return this._onNotifyPropertyChanged;
  }

  /**
   * Callback to be fired on VM properties value changes.
   */
  set onNotifyPropertyChanged(value) {
    this._onNotifyPropertyChanged = value;
  }

  /**
   * Callback to be fired on VM’s collection changes.
   */
  get onObservableCollectionItemAdded() {
    return this._onObservableCollectionItemAdded;
  }

  /**
   * Callback to be fired on VM’s collection changes.
   */
  set onObservableCollectionItemAdded(value) {
    this._onObservableCollectionItemAdded = value;
  }

  //#endregion


  //#region ------ Public methods ------

  /**
   * Cleans-up the resources.
   */
  cleanup() {
    this._model = null;

    if (this.onCleanup) {
      this.onCleanup();
    }
  }

  //#endregion
}
