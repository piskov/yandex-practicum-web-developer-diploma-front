import './pages/saved.css';

import ExplorerApi from './js/api/ExplorerApi';
import SavedArticlesRepositoryModel from './js/model/SavedArticlesRepositoryModel';
import SavedArticlesRepositoryViewModel from './js/view-model/SavedArticlesRepositoryViewModel';
import SavedArticlesView from './js/view/SavedArticlesView';
import UserModel from './js/model/UserModel';

import errorConstants from './js/constants/error-constants';


(async function () {
  const explorerApi = new ExplorerApi();
  const userModel = new UserModel(explorerApi);

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
