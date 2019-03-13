const articlesRouter = require('express').Router();
const { sendArticles, sendAddedArticle } = require('../controllers/articlesController');

articlesRouter.route('/').get(sendArticles)
  .post(sendAddedArticle);

module.exports = { articlesRouter };
