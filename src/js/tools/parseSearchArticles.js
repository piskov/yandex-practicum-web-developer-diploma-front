import ArticleModel from '../model/ArticleModel';

/**
 * Creates article models from News API JSON.
 *
 * @param searchPhrase {string}
 * Search phrase for the articles
 *
 * @param jsonData {[Object]}
 * Collection of articles.
 *
 * @returns {[ArticleModel]} Parsed articles.
 * @private
 */
export default function parseSearchArticles(searchPhrase, jsonData) {
  const articles = [];

  if (jsonData === undefined
    || jsonData.articles === undefined
    || jsonData.articles.length === 0) {
    return articles;
  }

  for (let item of jsonData.articles) {
    const { title, description, url, urlToImage, publishedAt } = item;
    const source = item.source.name;

    const article = new ArticleModel(
      searchPhrase,
      title,
      description,
      publishedAt,
      source,
      url,
      urlToImage
    );

    articles.push(article);
  }

  return articles;
}
