// const { getArticles, getArticlesByQuery } = require('../models/articlesModel');
const { getArticles, addArticle } = require('../models/articlesModel');


exports.sendArticles = (req, res, next) => { // if a query but not a sort query
  let sortBy;
  let order;
  const conditions = {};

  for (const key in req.query) {
    if (key === 'sort_by') {
      if (req.query[key] === 'comment_count') sortBy = 'comment_count';
      else sortBy = `articles.${req.query[key]}`;
    } else if (key === 'order') order = req.query[key];
    else if (key === 'comment_count') conditions.comment_count = req.query[key]; // this needs fixing
    else conditions[`articles.${key}`] = req.query[key];
  }

  getArticles(sortBy, order, conditions)
    .then((articles) => {
      res.status(200).send({ articles });
    });
};


exports.sendArticlesByArticleId = (req, res, next) => { // if a query but not a sort query
  let sortBy;
  let order;
  const conditions = {};
  conditions[`articles.${Object.keys(req.params)[0]}`] = req.params.article_id;

  getArticles(sortBy, order, conditions)
    .then((article) => {
      res.status(200).send({ article });
    });
};


exports.sendAddedArticle = (req, res, next) => {
  const authoredBody = req.body;
  authoredBody.author = authoredBody.username;
  delete authoredBody.username;

  addArticle(authoredBody)
    .then((addedArticle) => {
      res.status(201).send({ addedArticle });
    });
};
