const commentsRouter = require('express').Router();
const {
  sendVoteUpdatedComment,
  sendStatusDeletedComment,
  sendAddedUser,
} = require('../controllers/commentsController');


/* commentsRouter.route('/')
  .post(sendAddedUser);
  */

commentsRouter.route('/:comment_id')
  .patch(sendVoteUpdatedComment)
  .delete(sendStatusDeletedComment);


module.exports = { commentsRouter };
