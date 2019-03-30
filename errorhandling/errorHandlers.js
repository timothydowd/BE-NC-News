
exports.unrecognizedRoute = (req, res, next) => {
  const message = '404 - incorrect route';
  res.status(404).send({ message });
};

exports.handle400 = (err, req, res, next) => {
  const codes = {
    incVoteInvalid: `400 - ${err.detail || 'bad request'}`,
    '22P02': '400 - Invalid article_id/comment_id',
    23502: `400 - ${err.detail || 'bad request'}`, // missing parameters in req body for post
    42703: `400 - ${err.detail || 'bad request'}`, // non exisiting colum in sort_by param in get articles
    orderErr: `400 - ${err.detail || 'bad request'}`,
    forgnKeyNoMatch: `400 - ${err.detail || 'bad request'}`,
    23503: `400 - ${err.detail || 'bad request'}`,
    commentIdNotValid: `400 - ${err.detail || 'bad request'}`,
  };
  if (codes[err.code]) {
    res.status(400).send({ msg: codes[err.code] });
  } else next(err);
};

exports.handle422 = (err, req, res, next) => {
  const codes = {
    23505: `422 - ${err.detail || 'Unprocessable Entity'}`, // slug already exists in topic field
  };
  if (codes[err.code]) {
    res.status(422).send({ msg: codes[err.code] });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  const codes = {
    articleIdNotFound: `404 - ${err.detail}`,
    topicNotFound: `404 - ${err.detail}`,
    userNotFound: `404 - ${err.detail}`,
    notFound: `404 - ${err.detail}`,
    commentIdNotFound: `404 - ${err.detail}`,
  };
  if (codes[err.code]) {
    res.status(404).send({ msg: codes[err.code] });
  } else next(err);
};


exports.handle500 = (err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).send({ msg: `500 - ${err.detail || 'internal server error'}` });
  } else next(err);
};
