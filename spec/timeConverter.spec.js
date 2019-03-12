const { timeConverter } = require('../utils/timeConverter');
const { expect } = require('chai');


describe('timeConverter', () => {
  it('converts an array containing unix timestamp into knex acceptable date format', () => {
    const input = [{ created_at: 1289996514171 }];
    const expected = [{ created_at: new Date('2010-11-17T12:21:54.171Z') }];
    console.log(timeConverter(input));
    expect(timeConverter(input)).to.eql(expected);
  });
});
