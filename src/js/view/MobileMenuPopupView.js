import PopupView from './PopupView';
import PopupViewModel from '../view-model/PopupViewModel';


/**
 * Describes a view for a mobile menu popup.
 */
export default class MobileMenuPopupView extends PopupView {
  /**
     * Inits new instance of the mobile menu view.
     * @param {PopupViewModel} dataContext Underlying VM.
     */
  constructor(dataContext) {
    super(
      dataContext,
      document.getElementById('mobile-menu-popup'),
      null
    );

    this._menuOpenButton = document.querySelector('.menu__image-button');
    this._subscribeToUiEvents();
  }


  //#region ------ Event handlers ------

  /**
   * Handles show secondary popup button click.
   */
  _onMenuOpenButtonClick() {
    super.dataContext.isShown = true;
  }

  /**
   * Cleans-up the resources.
   */
  _onVmCleanup() {
    this._unsubscribeFromUiEvents();
    super._onVmCleanup();
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    this._onMenuOpenButtonClick = this._onMenuOpenButtonClick.bind(this);
    this._menuOpenButton.addEventListener('click', this._onMenuOpenButtonClick);
    super._subscribeToUiEvents();
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    this._menuOpenButton.removeEventListener('click', this._onMenuOpenButtonClick);
  }

  //#endregion

}
