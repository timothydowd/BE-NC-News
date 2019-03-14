
exports.unrecognizedRoute = (req, res, next) => {
  const message = '404 - incorrect route';
  res.status(404).send({ message });
};

exports.handle400 = (err, req, res, next) => {
  const codes = {
    23502: '400 - missing parameters in request body',
  };
  if (codes[err.code]) {
    res.status(400).send({ msg: codes[err.code] });
  } else next(err);
};

exports.handle405 = (err, req, res, next) => {
  const codes = {
    23502: 'violates not null violation',

  };

  if (codes[err.code]) res.status(400).send({ msg: codes[err.code] });
  else next(err);
};
