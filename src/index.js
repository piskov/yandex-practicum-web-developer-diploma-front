import './pages/index.css';

import ExplorerApi from './js/api/ExplorerApi';
import NewsApi from './js/api/NewsApi';

import SearchedArticlesRepositoryModel from './js/model/SearchedArticlesRepositoryModel';
import SearchedArticlesRepositoryViewModel from './js/view-model/SearchedArticlesRepositoryViewModel';
import SearchedArticlesView from './js/view/SearchedArticlesView';
import UserModel from './js/model/UserModel';


const explorerApi = new ExplorerApi();
const newsApi = new NewsApi();

const userModel = new UserModel(explorerApi);

const repositoryModel = new SearchedArticlesRepositoryModel(explorerApi, newsApi);
const repositoryVM = new SearchedArticlesRepositoryViewModel(repositoryModel);
const repositoryView = new SearchedArticlesView(repositoryVM);

userModel.loadNameAsync();
