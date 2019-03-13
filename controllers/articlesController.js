// const { getArticles, getArticlesByQuery } = require('../models/articlesModel');
const { getArticles } = require('../models/articlesModel');


/*
exports.sendArticles = (req, res, next) => { // if a query but not a sort query
  if (Object.keys(req.query).length !== 0 && Object.keys(req.query)[0] !== 'sort_by') {
    const key = `articles.${Object.keys(req.query)[0]}`;
    const val = Object.values(req.query)[0];

    getArticlesByQuery(key, val)
      .then((articles) => {
        // console.log(articles);
        res.status(200).send({ articles });
      });
  } else {
    console.log(req.query);
    const val = Object.values(req.query)[0]; // adds either sort query or empty val to val
    const order = Object.values(req.query)[1];
    getArticles(val, order)

      .then((articles) => {
        res.status(200).send({ articles });
      });
  }
};
*/

exports.sendArticles = (req, res, next) => { // if a query but not a sort query
  let sortBy;
  let order;
  const conditions = {};

  for (const key in req.query) {
    if (key === 'sort_by') {
      if (req.query[key] === 'comment_count') sortBy = 'comment_count';
      else sortBy = `articles.${req.query[key]}`;
    } else if (key === 'order') order = req.query[key];
    else if (key === 'comment_count') conditions.comment_count = req.query[key];
    else conditions[`articles.${key}`] = req.query[key];
  }

  console.log(sortBy);
  console.log(order);
  console.log(conditions);


  getArticles(sortBy, order, conditions)
    .then((articles) => {
      res.status(200).send({ articles });
    });
};
