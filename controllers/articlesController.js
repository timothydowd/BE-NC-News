const { getArticles, getArticlesByQuery } = require('../models/articlesModel');

exports.sendArticles = (req, res, next) => {
  if (Object.keys(req.query).length !== 0) {
    console.log(req.query);

    const key = `articles.${Object.keys(req.query)[0]}`;
    const val = Object.values(req.query)[0];

    getArticlesByQuery(key, val)
      .then((articles) => {
        console.log(articles);
        res.status(200).send({ articles });
      });
  } else {
    getArticles()

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
