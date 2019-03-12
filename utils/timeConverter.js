
const timeConverter = array => array.map((row) => {
  const newObj = row;
  newObj.created_at = new Date(row.created_at);

  return newObj;
});


module.exports = { timeConverter };
