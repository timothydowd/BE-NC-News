const { getTopics, addTopic } = require('../models/topicsModel');

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendAddedTopic = (req, res, next) => {
  const newTopic = req.body;
  addTopic(newTopic)
    .then((singleAddedTopic) => {
      const [arrayDestructuredComment] = singleAddedTopic;
      res.status(201).send({ addedTopic: arrayDestructuredComment });
    })
    .catch((err) => {
      next(err);
    });
};
