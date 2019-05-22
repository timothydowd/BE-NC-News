const commentsRouter = require('express').Router();
const {
  sendVoteUpdatedComment,
  sendStatusDeletedComment,
} = require('../controllers/commentsController');


commentsRouter.route('/:comment_id')
  .patch(sendVoteUpdatedComment)
  .delete(sendStatusDeletedComment);


module.exports = { commentsRouter };
