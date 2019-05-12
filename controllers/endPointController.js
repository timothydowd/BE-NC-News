const endpoints = require('../db/endPoints');

exports.sendEndPoints = (req, res, next) => {
  res.status(200).send({ endpoints })
    .catch((err) => {
      next(err);
    });
};
