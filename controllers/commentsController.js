const {
  updateCommentVotes,
  deleteComment,
} = require('../models/commentsModel');


exports.sendVoteUpdatedComment = (req, res, next) => {
  const newVote = req.body.inc_votes;
  const commentId = req.params;


  if (!newVote || !Number.isInteger(newVote) || Object.keys(req.body).length !== 1) next({ code: 'incVoteInvalid', detail: 'Number of votes not specified / invalid entry type / invalid entry field' });
  else {
    updateCommentVotes(commentId, newVote)
      .then((updatedComment) => {
        res.status(202).send({ updatedComment });
      })
      .catch((err) => {
        next(err);
      });
  }
};


exports.sendStatusDeletedComment = (req, res, next) => {
  const commentId = req.params;
  deleteComment(commentId)
    .then(() => res.sendStatus(204));
};
