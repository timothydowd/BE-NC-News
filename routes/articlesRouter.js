const articlesRouter = require('express').Router();
const {
  sendArticles, sendAddedArticle, sendArticlesByArticleId, sendVoteUpdatedArticle,
} = require('../controllers/articlesController');

articlesRouter.route('/').get(sendArticles)
  .post(sendAddedArticle);

articlesRouter.route('/:article_id').get(sendArticlesByArticleId)
  .patch(sendVoteUpdatedArticle);


module.exports = { articlesRouter };
