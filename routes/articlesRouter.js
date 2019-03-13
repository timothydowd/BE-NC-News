const articlesRouter = require('express').Router();
const { sendArticles, sendAddedArticle, sendArticlesByArticleId } = require('../controllers/articlesController');

articlesRouter.route('/').get(sendArticles)
  .post(sendAddedArticle);

articlesRouter.route('/:article_id').get(sendArticlesByArticleId);


module.exports = { articlesRouter };
