process.env.NODE_ENV = 'test';

const {
  expect,
} = require('chai');
const {
  app,
} = require('../app');
const {
  connection,
} = require('../connection');
const request = require('supertest')(app);

describe.only('/api', () => {
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());

  describe('/users', () => {
    it('GET users - status:200 responds with an array of users', () => request.get('/api/users/').expect(200)
      .then((res) => {
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[1]).to.eql({
          username: 'icellusedkars',
          name: 'sam',
          avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
        });
      }));

    it('GET users - content objects must contain the keys username, name and avatar_url', () => request.get('/api/users/')
      .then((res) => {
        expect(res.body.users[0]).contains.keys('username', 'name', 'avatar_url');
      }));
  });

  describe('/topics', () => {
    it('GET topics - status:200 responds with an array of topics', () => request.get('/api/topics/')
      .then((res) => {
        expect(res.body.topics).to.be.an('array');
        expect(res.body.topics.length).to.equal(2);
        expect(res.body.topics[1]).to.eql({
          slug: 'cats',
          description: 'Not dogs',
        });
      }));

    it('GET topics - content objects must contain the keys slug and description', () => request.get('/api/topics/').expect(200)
      .then((res) => {
        expect(res.body.topics[0]).contains.keys('slug', 'description');
      }));


    it('POST topic - status 201 - responds with the posted object', () => {
      const input = {
        slug: 'somethingPrettyUnique',
        description: 'Cyril was a naughy man',
      };

      const output = {
        addedTopic: [{
          slug: 'somethingPrettyUnique',
          description: 'Cyril was a naughy man',
        }],
      };

      return request.post('/api/topics/').send(input)
        .expect(201)
        .then((res) => {
          expect(res.body).to.eql(output);
        });
    });
  });

  describe('/articles', () => {
    it('GET articles - status:200 responds with an array of articles', () => request.get('/api/articles/').expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.an('array');
      }));
    it('GET articles - content objects must contain correct keys including a comment count', () => request.get('/api/articles/')
      .then((res) => {
        expect(res.body.articles[0]).contains.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
      }));
    it('GET articles - content object must contain correct number of comments in comment_count', () => request.get('/api/articles/')
      .then((res) => {
        expect(res.body.articles[0].comment_count).to.equal('13');
      }));
  });
});
