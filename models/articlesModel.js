const { connection } = require('../connection');

exports.getArticles = (sortBy = 'articles.created_at', orderBy = 'desc') => connection
  .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .count('comments.comment_id as comment_count')
  .orderBy(sortBy, orderBy);
// exports.addTopic = data => connection('topics').insert(data).returning('*');


exports.getArticlesByQuery = (key, val) => connection
  .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
  .from('articles')
  .where(key, '=', val)
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .count('comments.comment_id as comment_count')
  .orderBy('articles.created_at');
