import PopupView from './PopupView';
import PopupViewModel from '../../js/view-model/PopupViewModel';


/**
 * Describes a view for a “sign-up successful” popup.
 */
export default class SignUpOkPopupView extends PopupView {
  /**
     * Inits new instance of the sign-up popup view.
     * @param {PopupViewModel} dataContext Underlying VM.
     */
  constructor(dataContext) {
    super(
      dataContext,
      document.getElementById('signup-ok-popup'),
      null
    );
  }
}
