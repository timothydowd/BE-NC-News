const { getTopics } = require('../models/topicsModel');

exports.sendTopics = (req, res, next) => {
  getTopics()

    .then((topics) => {
      res.status(200).send({ topics });
    });
};
