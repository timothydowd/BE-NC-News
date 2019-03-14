
exports.unrecognizedRoute = (req, res, next) => {
  const message = '404 - incorrect route';
  res.status(404).send({ message });
};

exports.handle404 = (err, req, res, next) => {


};
