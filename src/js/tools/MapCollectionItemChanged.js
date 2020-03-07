/**
 * Generic collection item changed info.
 */
export default class MapCollectionItemChanged {
  /**
   * Inits new instance of MapCollectionItemChanged.
   *
   * @param {string} key
   * Item’s key.
   *
   * @param {boolean} isAdded
   * Indicates whether item was added (true) or deleted (false).
   */
  constructor(key, isAdded) {
    this._key = key;
    this._isAdded = isAdded;
  }


  //#region ------ Properties ------

  /**
   * Indicates whether item was inserted or deleted.
   * @type {boolean}
   */
  get isAdded() {
    return this._isAdded;
  }

  /**
   * Item’s key.
   * @type {string}
   */
  get key() {
    return this._key;
  }

  //#endregion
}
