
const {
  getArticles, addArticle, updateVotes, deleteArticle, getComments, addComment,
} = require('../models/articlesModel');


exports.sendArticles = (req, res, next) => {
  let sortBy;
  let order;
  const conditions = {};

  for (const key in req.query) {
    if (key === 'sort_by') {
      if (req.query[key] === 'comment_count') sortBy = 'comment_count';
      else sortBy = `articles.${req.query[key]}`;
    } else if (key === 'order') {
      if (req.query.order !== 'asc' || req.query.order !== 'desc') next({ code: 'orderErr', detail: 'sort by order must be asc or desc.' });
      order = req.query[key];
    } else if (key === 'comment_count') conditions.comment_count = req.query[key]; // this needs fixing
    else conditions[`articles.${key}`] = req.query[key];
  }

  getArticles(sortBy, order, conditions)
    .then((articles) => {
      if (articles.length === 0) next({ code: 'notFound', detail: 'record not found' });
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};


exports.sendArticlesByArticleId = (req, res, next) => { // if a query but not a sort query
  let sortBy;
  let order;
  const conditions = {};
  conditions[`articles.${Object.keys(req.params)[0]}`] = req.params.article_id;

  getArticles(sortBy, order, conditions)
    .then((article) => {
      if (article.length === 0) next({ code: 404, detail: 'Article not found' });
      else res.status(200).send({ article });
    });
};


exports.sendAddedArticle = (req, res, next) => {
  const authoredBody = req.body;
  authoredBody.author = authoredBody.username;
  delete authoredBody.username;

  addArticle(authoredBody)
    .then((addedArticle) => {
      res.status(201).send({ addedArticle });
    })
    .catch((err) => {
      next(err);
    });
};


exports.sendVoteUpdatedArticle = (req, res, next) => {
  const newVote = req.body.inc_votes;
  const articleId = req.params;

  updateVotes(articleId, newVote)
    .then((updatedArticle) => {
      res.status(202).send({ updatedArticle });
    });
};

exports.sendStatusDeleted = (req, res, next) => {
  const articleId = req.params;
  deleteArticle(articleId)
    .then(() => res.sendStatus(204));
};


exports.sendCommentsByArticleId = (req, res, next) => {
  const articleId = req.params;
  let sortBy;
  let order;

  for (const key in req.query) {
    if (key === 'sort_by') sortBy = req.query[key];
    if (key === 'order') order = req.query[key];
  }

  getComments(articleId, sortBy, order)
    .then((commentsByArticleId) => {
      res.status(200).send({ commentsByArticleId });
    });
};


exports.sendAddedComment = (req, res, next) => {
  const authoredBody = req.body;
  authoredBody.article_id = req.params.article_id;
  authoredBody.author = authoredBody.username;
  delete authoredBody.username;

  addComment(authoredBody)
    .then((addedComment) => {
      res.status(201).send({ addedComment });
    });
};
