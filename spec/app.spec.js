process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const { app } = require('../app');
const { connection } = require('../connection');
const request = require('supertest')(app);

describe.only('/api', () => {
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());

  describe('/users', () => {
    it('GET status:200 responds with an array of users', () => request.get('/api/users/').expect(200)
      .then((res) => {
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[1]).to.eql({
          username: 'icellusedkars',
          name: 'sam',
          avatar_url:
            'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
        });
      }));
  });
});
