const { getArticles } = require('../models/articlesModel');

exports.sendArticles = (req, res, next) => {
  getArticles()

    .then((articles) => {
      // console.log(articles)
      res.status(200).send({ articles });
    });
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
