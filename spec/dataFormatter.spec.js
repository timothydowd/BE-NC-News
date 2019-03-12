const { commentsFormatter } = require('../utils/dataFormatters');
const { expect } = require('chai');


describe('commentsFormatter', () => {
  it('takes an array containing an object and returns a new array with adjusted key names and time', () => {
    const input1 = [{
      article_id: 1,
      title: 'Living in the shadow of a great man',
      body: 'I find this existence challenging',
      votes: 100,
      topic: 'mitch',
      author: 'butter_bridge',
      created_at: new Date('2018-11-15T12:21:54.171Z'),
    },
    ];

    const input2 = [{
      body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    ];
    const expected = [{
      author: 'butter_bridge',
      article_id: 1,
      votes: 14,
      created_at: new Date('2016-11-22T12:36:03.389Z'),
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
    }];
    expect(commentsFormatter(input1, input2)).to.eql(expected);
  });
});
