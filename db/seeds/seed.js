const {
  userData, topicData, articleData, commentData,
} = require('../data/test-data/index');
const { convertTime } = require('../../utils/timeConverter');

const { formatComments } = require('../../utils/dataFormatters');

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
      const timeFormatArticleData = convertTime(articleData);
      return knex('articles')
        .insert(timeFormatArticleData)
        .returning('*');
    })
    .then((articles) => {
      const commentDataWithArticleId = formatComments(articles, commentData);

      return knex('comments')
        .insert(commentDataWithArticleId)
        .returning('*');
    });
};
