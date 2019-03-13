const commentsRouter = require('express').Router();
const {
  sendVoteUpdatedComment,
} = require('../controllers/commentsController');


commentsRouter.route('/:comment_id')
  .patch(sendVoteUpdatedComment);


module.exports = { commentsRouter };
