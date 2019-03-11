const { userData, topicData, articleData } = require('../data/test-data/index');
const timeConverterForArray = require('../../utils/timeConverter')

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
      return knex('topics')
        .insert(topicData)
        .returning('*')
    })
    .then((topics) => {
      // knex.select().from('topics').then(consol.log)
      //console.log(topics)
        const timeFormatArticleData = timeConverterForArray(articleData)
        console.log(timeFormatArticleData)
        const articles = knex('articles')
          .insert(timeFormatArticleData)
          .returning('*')
          return Promise.all([topics, articles])
      }); 
};