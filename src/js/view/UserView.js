import BaseView from './BaseView';
import UserViewModel from '../view-model/UserViewModel';

import updateElementVisiblity from '../tools/updateElementVisiblity';


/**
 * Describes a view for a user.
 */
export default class UserView extends BaseView {
  /**
   * Inits new instance of the user view.
   * @param {UserViewModel} dataContext Underlying VM.
   */
  constructor(dataContext) {
    super(dataContext, document);

    super.subscribeToCleanup(this._onVmCleanup.bind(this));
    super.subscribeToVmPropertyChanged(this._onVmPropertyChanges.bind(this));

    this._hiddenMenuItems = Array.from(document.getElementsByClassName('menu__item_is-hidden'));
    this._nameHolders = Array.from(document.getElementsByClassName('menu__username'));

    this._headerLogoutButton = document.getElementById('headerlogoutButton');
    this._headerLoginButton = document.getElementById('headerLoginButton');

    this._subscribeToUiEvents();
  }


  //#region ------ Event handlers ------

  /**
   * Handles log-in button click.
   * @param {Event} event
   */
  _onLoginButtonClick(event) {
    this._dataContext.showLoginPopupCommand();
  }

  /**
   * Handles logout button click.
   * @param {Event} event
   */
  _onLogoutButtonClick(event) {
    super.dataContext.logoutCommand();
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
      case 'isLoggedIn':
        this._showSignedInControls();
        break;

      case 'userFirstName':
        this._updateName(super.dataContext.userFirstName);
        break;

      default:
        break;
    }
  }

  //#endregion


  //#region ------ Private methods ------

  /**
   * Hides login button, shows logout button and hidden menu items
   */
  _showSignedInControls() {
    /**
     * @type {UserViewModel}
     */
    const data = super.dataContext;

    if (!data.isLoggedIn) {
      return;
    }

    const classForIsHidden = 'menu__item_is-hidden';

    updateElementVisiblity(this._headerLoginButton, false, classForIsHidden);

    this._hiddenMenuItems.forEach(item =>
      updateElementVisiblity(item, true, classForIsHidden)
    );
  }

  /**
   * Subscribes to UI events.
   */
  _subscribeToUiEvents() {
    this._onLoginButtonClick = this._onLoginButtonClick.bind(this);
    this._headerLoginButton.addEventListener('click', this._onLoginButtonClick);

    this._onLogoutButtonClick = this._onLogoutButtonClick.bind(this);
    this._headerLogoutButton.addEventListener('click', this._onLogoutButtonClick);
  }

  /**
   * Unsubscribes from UI events.
   */
  _unsubscribeFromUiEvents() {
    this._headerLoginButton.removeEventListener('click', this._onLoginButtonClick);
    this._headerLogoutButton.removeEventListener('click', this._onLogoutButtonClick);
  }

  /**
   * Update all occurences of the user’s name.
   * @param {string} name
   */
  _updateName(name) {
    this._nameHolders.forEach(span => span.textContent = name);
  }

  //#endregion
}
