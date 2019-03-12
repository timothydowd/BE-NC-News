const topicsRouter = require('express').Router();
const { sendTopics, sendAddedTopic } = require('../controllers/topicsController');

topicsRouter.route('/').get(sendTopics)
  .post(sendAddedTopic);

module.exports = { topicsRouter };
