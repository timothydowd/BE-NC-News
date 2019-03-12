const { getArticles, getArticlesByQuery } = require('../models/articlesModel');

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
/*
exports.sendAddedTopic = (req, res, next) => {
  const newTopic = req.body;
  addTopic(newTopic)
    .then((addedTopic) => {
      res.status(201).send({ addedTopic });
    });
};
*/
