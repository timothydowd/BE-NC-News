const { connection } = require('../connection');


exports.getArticles = (sortBy = 'articles.created_at', orderBy = 'desc', conditions = {}) => {
  console.log('in model');
  return connection
    .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
    .from('articles')
    .where(conditions)
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .count('comments.comment_id as comment_count')

    .orderBy(sortBy, orderBy);
};


exports.addArticle = data => connection('articles').insert(data).returning('*');
