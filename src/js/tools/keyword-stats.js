import ArticleViewModel from "../view-model/ArticleViewModel";

export function getArticlesCountMessage(userName, articlesCount) {
  const savedWord = articlesCount === 1 ? 'сохранённая' : 'сохранённых';
  const articlesWord = getArticlesWordVariant(articlesCount);

  return `${userName}, у вас ${articlesCount} ${savedWord} ${articlesWord}`;
}

/**
 * Counts keyword in saved articles collection.
 * @param {[ArticleViewModel]} articles Saved articles.
 * @returns {[string]} Keyword list sorted by articles count.
 */
export function getKeywordList(articles) {
  if (articles.length === 0) {
    return [];
  }

  const stats = articles.reduce((counter, article) => {
    const keyword = article.keyword.toLocaleLowerCase();
    if (!counter.hasOwnProperty(keyword)) {
      counter[keyword] = 0;
    }

    counter[keyword]++;

    return counter;
  }, {});

  const sortedKeywordList = Object
    .keys(stats)
    .map(keyword => {
      return {
        keyword,
        count: stats[keyword]
      };
    })
    .sort((a, b) => {
      if (a.count < b.count) {
        // order by keyword count descending
        return 1;
      }

      if (a.count === b.count
        && a.keyword > b.keyword) {
        // order alphabetically if counts are the same
        return 1;
      }

      return -1;
    })
    .map(item => item.keyword);

  if (sortedKeywordList.length < 4) {
    return sortedKeywordList;
  }
  else {
    return [
      sortedKeywordList[0],
      sortedKeywordList[1],
      `${sortedKeywordList.length - 2} другим`
    ];
  }
}


//#region ------ Private functions ------

/**
 * Get correct form of the articles count word based on the articles count.
 * @param {number} count Articles count.
 * @returns {string} Correct word form based on articles count.
 */
function getArticlesWordVariant(count) {
  const articlesWordVariants = ['статья', 'статьи', 'статей'];

  if (count > 100) {
    count = count % 100;
  }

  if (count >= 10 && count <= 20) {
    return articlesWordVariants[2];
  }

  if (count > 20) {
    count = count % 10;
  }

  if (count === 1) {
    return articlesWordVariants[0];
  }

  if (count < 5) {
    return articlesWordVariants[1];
  }

  return articlesWordVariants[2];
}

//#endregion
