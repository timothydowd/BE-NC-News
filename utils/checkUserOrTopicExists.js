const { connection } = require('../connection');


exports.checkUserOrTopicExists = (req, res, next) => {
  if (req.query.topic) {
    const slug = { slug: req.query.topic };
    return connection('topics').select('*').where(slug)
      .then((topic) => {
        if (topic.length === 0) {
          return { notFoundMsg: { code: topicNotFound, detail: `${slug.slug} does not exist as a topic` } };
        }
        return true;
      });
  }
  if (req.query.author) {
    const userName = { username: req.query.author };
    return connection('users').select('*').where(userName)
      .then((user) => {
        if (user.length === 0) {
          return { notFoundMsg: { code: 'userNotFound', detail: `The user ${userName.username} does not exist` } };
        }
        return true;
      });
  }

  return true;
};
