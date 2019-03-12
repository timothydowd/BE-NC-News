const timeConverter = require('../utils/timeConverter');
const { expect } = require('chai');


describe('createRef', () => {
  it('creates a lookup object when passed a person in an array', () => {
    const input = [{
      id: 1,
      name: 'jezza',
    }];
    const expected = {
      jezza: 1,
    };
    expect(createRef(input, 'name', 'id')).to.eql(expected);
  });
  
});
