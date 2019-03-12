const articlesRouter = require('express').Router();
const { sendArticles } = require('../controllers/articlesController');

articlesRouter.route('/').get(sendArticles);
// .post(sendAddedTopic);

module.exports = { articlesRouter };
