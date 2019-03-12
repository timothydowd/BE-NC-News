const { connection } = require('../connection');

exports.getArticles = () => connection

  .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
  .from('articles')
  .join('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .count('comments.comment_id as comment_count')
  .orderBy('articles.article_id');


// exports.addTopic = data => connection('topics').insert(data).returning('*');
