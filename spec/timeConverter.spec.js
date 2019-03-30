const { convertTime } = require('../utils/timeConverter');
const { expect } = require('chai');


describe('convertTime', () => {
  it('converts an array of objects containing unix timestamp into knex acceptable date format', () => {
    const input = [{
      title: 'a', topic: 'b', author: 'c', body: 'd', created_at: 1289996514171,
    }];
    const expected = [{
      title: 'a', topic: 'b', author: 'c', body: 'd', created_at: new Date('2010-11-17T12:21:54.171Z'),
    }];
    expect(convertTime(input)).to.eql(expected);
  });
});
