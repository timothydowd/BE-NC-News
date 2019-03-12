

const createRef = (array, key, val) => array.reduce((acc, element) => {
  acc[element[key]] = element[val];
  return acc;
}, {});

module.exports = createRef;
