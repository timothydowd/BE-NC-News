const { connection } = require('../connection');


exports.getArticles = (sortBy = 'articles.created_at', orderBy = 'desc', conditions = {}) => connection
  .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
  .from('articles')
  .where(conditions)
  .leftJoin('comments', 'articles.article_id', 'comments.article_id')
  .groupBy('articles.article_id')
  .count('comments.comment_id as comment_count')
  .orderBy(sortBy, orderBy);

exports.updateVotes = (articleId, newVote) => connection('articles')
  .where(articleId)
  .increment('votes', newVote)
  .returning('*');


exports.addArticle = data => connection('articles').insert(data).returning('*');


exports.deleteArticle = articleId => connection('articles')
  .where(articleId)
  .del();

exports.getComments = (articleId, sortBy = 'created_at', orderBy = 'desc') => connection
  .select('*')
  .from('comments')
  .where(articleId)
  .orderBy(sortBy, orderBy);


exports.addComment = data => connection('comments').insert(data).returning('*');
