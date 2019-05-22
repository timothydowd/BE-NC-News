const convertTime = array => array.map((row) => {
  let newObj;
  const {
    body, belongs_to, created_by, votes, created_at, title, topic, author,
  } = row;

  if (row.title) {
    newObj = {
      title, topic, author, body, created_at: new Date(created_at),
    };
  } else {
    newObj = {
      body, belongs_to, created_by, votes, created_at: new Date(created_at),
    };
  }

  return newObj;
});

module.exports = { convertTime };
