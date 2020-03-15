import './pages/saved.css';

import ExplorerApi from './js/api/ExplorerApi';
import PopupViewModel from './js/view-model/PopupViewModel';
import MobileMenuPopupView from './js/view/MobileMenuPopupView';
import SavedArticlesRepositoryModel from './js/model/SavedArticlesRepositoryModel';
import SavedArticlesRepositoryViewModel from './js/view-model/SavedArticlesRepositoryViewModel';
import SavedArticlesView from './js/view/SavedArticlesView';
import UserModel from './js/model/UserModel';
import UserView from './js/view/UserView';
import UserViewModel from './js/view-model/UserViewModel';

import errorConstants from './js/constants/error-constants';


(async function () {
  const explorerApi = new ExplorerApi();

  const mobileMenuPopupVM = new PopupViewModel();
  const mobileMenuPopupView = new MobileMenuPopupView(mobileMenuPopupVM);

  const userModel = new UserModel(explorerApi);
  const userVM = new UserViewModel(userModel, mobileMenuPopupVM);
  const userView = new UserView(userVM);

  const repositoryModel = new SavedArticlesRepositoryModel(explorerApi);
  const repositoryVM = new SavedArticlesRepositoryViewModel(repositoryModel);
  const repositoryView = new SavedArticlesView(repositoryVM);

  const nameLoadOperation = await userModel.loadNameAsync();
  if (nameLoadOperation.error !== null) {
    repositoryVM.articlesCountMessage = errorConstants.HUMAN_READABLE_LOAD_SAVED_PAGE_ERROR;
    return;
  }

  repositoryVM.userFirstName = nameLoadOperation.data;
  repositoryModel.loadSavedArticlesAsync();
})();
