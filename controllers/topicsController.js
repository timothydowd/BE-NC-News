const { getTopics, addTopic } = require('../models/topicsModel');

exports.sendTopics = (req, res, next) => {
  getTopics()

    .then((topics) => {
      res.status(200).send({ topics });
    });
};

exports.sendAddedTopic = (req, res, next) => {
  const newTopic = req.body;
  addTopic(newTopic)
    .then((addedTopic) => {
      res.status(201).send({ addedTopic });
    });
};
