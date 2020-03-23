import './pages/index.css';

import ExplorerApi from './js/api/ExplorerApi';
import NewsApi from './js/api/NewsApi';

import UserModel from './js/model/UserModel';
import SearchedArticlesRepositoryModel from './js/model/SearchedArticlesRepositoryModel';

import PopupViewModel from './js/view-model/PopupViewModel';
import SearchedArticlesRepositoryViewModel from './js/view-model/SearchedArticlesRepositoryViewModel';
import UserViewModel from './js/view-model/UserViewModel';

import LoginPopupView from './blocks/popup/LoginPopupView';
import MobileMenuPopupView from './blocks/popup/MobileMenuPopupView';
import SearchedArticlesView from './blocks/cards-container/SearchedArticlesView';
import SignUpPopupView from './blocks/popup/SignUpPopupView';
import SignUpOkPopupView from './blocks/popup/SignUpOkPopupView';
import UserView from './js/view/UserView';


const explorerApi = new ExplorerApi();
const newsApi = new NewsApi();

const signUpPopupVM = new PopupViewModel();
const signUpPopupView = new SignUpPopupView(signUpPopupVM);

const loginPopupVM = new PopupViewModel(signUpPopupVM);
const loginPopupView = new LoginPopupView(loginPopupVM);

const signUpOkPopupVM = new PopupViewModel(loginPopupVM);
const signUpOkPopupView = new SignUpOkPopupView(signUpOkPopupVM);

signUpPopupVM.pairedPopup = loginPopupVM;

const mobileMenuPopupVM = new PopupViewModel();
const mobileMenuPopupView = new MobileMenuPopupView(mobileMenuPopupVM);

const userModel = new UserModel(explorerApi);
const userVM = new UserViewModel(
  userModel,
  mobileMenuPopupVM,
  loginPopupVM,
  signUpPopupVM,
  signUpOkPopupVM);
const userView = new UserView(userVM);

const repositoryModel = new SearchedArticlesRepositoryModel(explorerApi, newsApi);
const repositoryVM = new SearchedArticlesRepositoryViewModel(repositoryModel, userVM);
const repositoryView = new SearchedArticlesView(repositoryVM);

const shouldLogOutOnUnauthorized = false;
userModel.loadNameAsync(shouldLogOutOnUnauthorized);
