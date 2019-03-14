
exports.unrecognizedRoute = (req, res, next) => {
  const message = '404 - incorrect route';
  res.status(404).send({ message });
};

exports.handle400 = (err, req, res, next) => {
  console.log(err);
  const codes = {
    23502: `400 - ${err.detail}`, // missing parameters in req body for topics post
    42703: `400 - ${err.detail}`, // non exisiting colum in sort_by param in get articles
  };
  if (codes[err.code]) {
    res.status(400).send({ msg: codes[err.code] });
  } else next(err);
};

exports.handle422 = (err, req, res, next) => {
  const codes = {
    23505: `422 - ${err.detail}`, // slug already exists in topic field
  };
  if (codes[err.code]) {
    res.status(422).send({ msg: codes[err.code] });
  } else next(err);
};
