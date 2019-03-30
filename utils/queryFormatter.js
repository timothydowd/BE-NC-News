exports.formatQuery = (query) => {
  const conditions = {};
  let {
    sort_by,
    order,
    author,
    topic,
  } = query;

  if (author) username = { username: author };
  if (topic) slug = { topic };

  if (sort_by !== 'comment_count' && sort_by !== undefined) sort_by = `articles.${query.sort_by}`;
  if (order !== 'asc' && order !== 'desc' && order !== undefined) order = 'invalidInput';

  for (key in query) {
    if (key !== 'sort_by' && key !== 'order') {
      conditions[`articles.${key}`] = query[key]; // all this formats the res.query  so it can be accepted by get articles
    }
  }

  return { sort_by, order, conditions };
};
