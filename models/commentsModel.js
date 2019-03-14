const { connection } = require('../connection');

exports.updateCommentVotes = (commentId, newVote) => connection('comments')
  .where(commentId)
  .increment('votes', newVote)
  .returning('*');


exports.deleteComment = commentId => connection('comments')
  .where(commentId)
  .del();
