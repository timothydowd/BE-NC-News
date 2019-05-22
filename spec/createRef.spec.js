const { expect } = require('chai');
const createRef = require('../utils/createRef');


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
  it('creates a lookup object when passed a multiple people in an array', () => {
    const input = [{
      id: 1,
      name: 'jezza',
    },
    {
      id: 2,
      name: 'clive',
    },
    {
      id: 3,
      name: 'rodrick',
    },
    {
      id: 4,
      name: 'cyril',
    },
    {
      id: 5,
      name: 'bugs',
    },
    ];
    const expected = {
      jezza: 1,
      clive: 2,
      rodrick: 3,
      cyril: 4,
      bugs: 5,
    };
    expect(createRef(input, 'name', 'id')).to.eql(expected);
  });
});
