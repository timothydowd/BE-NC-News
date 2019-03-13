const {
  updateCommentVotes,
} = require('../models/commentsModel');


exports.sendVoteUpdatedComment = (req, res, next) => {
  const newVote = req.body.inc_votes;
  const commentId = req.params;

  console.log(commentId);
  updateCommentVotes(commentId, newVote)
    .then((updatedComment) => {
      res.status(202).send({ updatedComment });
    });
};
