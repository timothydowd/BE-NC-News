const {
  userData, topicData, articleData, commentData,
} = require('../data/test-data/index');
const { timeConverterForArticles, timeConverterForComments, timeConverter } = require('../../utils/timeConverter');

const { commentsFormatter } = require('../../utils/dataFormatters');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('users')
      .insert(userData)
      .returning('*'))
    .then(() => knex('topics')
      .insert(topicData)
      .returning('*'))
    .then(() => {
      const timeFormatArticleData = timeConverter(articleData);
      return knex('articles')
        .insert(timeFormatArticleData)
        .returning('*');

      // return articles;
    })
    .then((articles) => {
      /*
        const articleIdTitleRef = createRef(articles, 'title', 'article_id')
        const timeFormatCommentData = timeConverter(commentData)

        const commentDataWithArticleId = timeFormatCommentData.map(row => {
          const newCommentRecord = {
            author: row.created_by,
            article_id: articleIdTitleRef[row.belongs_to],
            votes: row.votes,
            created_at: row.created_at,
            body: row.body
          }

          return newCommentRecord
        })
        */
      const commentDataWithArticleId = commentsFormatter(articles, commentData);

      return knex('comments')
        .insert(commentDataWithArticleId)
        .returning('*');

      // return Promise.all([topics, articles, comments])
    });
};
