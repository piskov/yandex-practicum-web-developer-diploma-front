import ArticleModel from '../model/ArticleModel';


/**
 * Data transfer object for the ArticleModel.
 */
export default class ArticleDto {
  /**
   * Creates new DTO instance from the model.
   * @param {ArticleModel} articleModel Model for the DTO.
   */
  constructor(articleModel) {
    this.date = articleModel.publishedAt;
    this.image = articleModel.urlToImage;
    this.keyword = articleModel.keyword;
    this.link = articleModel.url;
    this.source = articleModel.source;
    this.text = articleModel.description;
    this.title = articleModel.title;
  }
}
