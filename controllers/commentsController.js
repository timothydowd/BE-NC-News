const {
  updateCommentVotes,
  deleteComment,
} = require('../models/commentsModel');


exports.sendVoteUpdatedComment = (req, res, next) => {
  const newVote = req.body.inc_votes;
  const commentId = req.params;

  updateCommentVotes(commentId, newVote)
    .then((updatedComment) => {
      res.status(202).send({ updatedComment });
    });
};


exports.sendStatusDeletedComment = (req, res, next) => {
  const commentId = req.params;
  deleteComment(commentId)
    .then(() => res.sendStatus(204));
};
