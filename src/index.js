import './pages/index.css';

import ExplorerApi from './js/api/ExplorerApi';
import NewsApi from './js/api/NewsApi';

import UserModel from './js/model/UserModel';
import SearchedArticlesRepositoryModel from './js/model/SearchedArticlesRepositoryModel';

import PopupViewModel from './js/view-model/PopupViewModel';
import SearchedArticlesRepositoryViewModel from './js/view-model/SearchedArticlesRepositoryViewModel';
import UserViewModel from './js/view-model/UserViewModel';

import LoginPopupView from './js/view/LoginPopupView';
import SearchedArticlesView from './js/view/SearchedArticlesView';
import UserView from './js/view/UserView';


const explorerApi = new ExplorerApi();
const newsApi = new NewsApi();

const loginPopupVM = new PopupViewModel();
const loginPopupView = new LoginPopupView(loginPopupVM);

const userModel = new UserModel(explorerApi);
const userVM = new UserViewModel(userModel, loginPopupVM);
const userView = new UserView(userVM);

const repositoryModel = new SearchedArticlesRepositoryModel(explorerApi, newsApi);
const repositoryVM = new SearchedArticlesRepositoryViewModel(repositoryModel, userVM);
const repositoryView = new SearchedArticlesView(repositoryVM);

const shouldLogOutOnUnauthorized = false;
userModel.loadNameAsync(shouldLogOutOnUnauthorized);
