import ArticleModel from '../model/ArticleModel';

/**
 *
 * Creates article models from News Explorer API JSON.
 *
 * @param jsonData {[Object]}
 * Collection of articles.
 *
 * @returns {[ArticleModel]} Parsed articles.
 * @private
 */
export default function parseSavedArticles(jsonData) {
  const articles = [];

  if (jsonData === undefined
    || jsonData.data === undefined
    || jsonData.data.length === 0) {
    return articles;
  }

  for (let item of jsonData.data) {
    const { _id, keyword, title, text, date, source, link, image } = item;

    const article = new ArticleModel(
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      true, // isSaved
      _id
    );

    articles.push(article);
  }

  return articles;
}
