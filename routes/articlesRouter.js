const articlesRouter = require('express').Router();
const {
  sendArticles, sendAddedArticle, sendArticlesByArticleId, sendVoteUpdatedArticle, sendStatusDeleted, sendCommentsByArticleId,
} = require('../controllers/articlesController');

articlesRouter.route('/').get(sendArticles)
  .post(sendAddedArticle);

articlesRouter.route('/:article_id').get(sendArticlesByArticleId)
  .patch(sendVoteUpdatedArticle)
  .delete(sendStatusDeleted);

articlesRouter.route('/:article_id/comments').get(sendCommentsByArticleId);


module.exports = { articlesRouter };
