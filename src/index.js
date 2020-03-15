import './pages/index.css';

import ExplorerApi from './js/api/ExplorerApi';
import NewsApi from './js/api/NewsApi';

import SearchedArticlesRepositoryModel from './js/model/SearchedArticlesRepositoryModel';
import SearchedArticlesRepositoryViewModel from './js/view-model/SearchedArticlesRepositoryViewModel';
import SearchedArticlesView from './js/view/SearchedArticlesView';
import UserModel from './js/model/UserModel';
import UserView from './js/view/UserView';
import UserViewModel from './js/view-model/UserViewModel';


const explorerApi = new ExplorerApi();
const newsApi = new NewsApi();

const userModel = new UserModel(explorerApi);
const userViewModel = new UserViewModel(userModel);
const userView = new UserView(userViewModel);

const repositoryModel = new SearchedArticlesRepositoryModel(explorerApi, newsApi);
const repositoryVM = new SearchedArticlesRepositoryViewModel(repositoryModel, userViewModel);
const repositoryView = new SearchedArticlesView(repositoryVM);

const shouldLogOutOnUnauthorized = false;
userModel.loadNameAsync(shouldLogOutOnUnauthorized);

// userModel.loginAsync('example@example.com', '12345678');
