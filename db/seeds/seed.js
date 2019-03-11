const { userData, topicData, articleData } = require('../data/test-data/index');

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex('users')
        .insert(userData)
        .returning('*'),
    )
    .then(() => {
      knex('topics')
        .insert(topicData)
        .returning('*')
    })
    .then((topics) => {
        const articles = knex('articles')
          .insert(articleData)
          .returning('*')
          return Promise.all([topics, articles])
      }); 
};