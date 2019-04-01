const {
  updateCommentVotes,
  deleteComment,
  getCommentbyId,
} = require('../models/commentsModel');


exports.sendVoteUpdatedComment = (req, res, next) => {
  const newVote = req.body.inc_votes;
  const commentId = req.params;


  if (!newVote || !Number.isInteger(newVote) || Object.keys(req.body).length !== 1) next({ code: 'incVoteInvalid', detail: 'Number of votes not specified / invalid entry type / invalid entry field' });
  else {
    updateCommentVotes(commentId, newVote)
      .then((singleUpdatedComment) => {
        const [arrayDestructuredComment] = singleUpdatedComment;
        res.status(202).send({ updatedComment: arrayDestructuredComment });
      })
      .catch((err) => {
        next(err);
      });
  }
};


exports.sendStatusDeletedComment = (req, res, next) => {
  const commentId = req.params;
  getCommentbyId(commentId)
    .then((comment) => {
      if (comment.length === 0) {
        console.log('in if');
        next({ code: 'commentIdNotFound', detail: 'comment_id does not exist' });
      } else {
        console.log('in else');
        deleteComment(commentId)
          .then(() => res.sendStatus(204));
      }
    })
    .catch((err) => {
      next(err);
    });
};
