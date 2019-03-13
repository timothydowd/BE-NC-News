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
    it('GET articles - filters the articles by the username value specified in the query', () => request.get('/api/articles/?author=rogersop')
      .then((res) => {
        expect(res.body.articles.length).to.eql(3);
        expect(res.body.articles[0].author).to.equal('rogersop');
        expect(res.body.articles[1].author).to.equal('rogersop');
        expect(res.body.articles[2].author).to.equal('rogersop');
      }));
    it('GET articles - filters the articles by the topic value specified in the query', () => request.get('/api/articles/?topic=mitch')
      .then((res) => {
        expect(res.body.articles.length).to.eql(11);
        expect(res.body.articles[0].topic).to.equal('mitch');
        expect(res.body.articles[1].topic).to.equal('mitch');
        expect(res.body.articles[2].topic).to.equal('mitch');
      }));
    it('GET articles - sorts the articles by any valid column (defaults to date)', () => request.get('/api/articles/?sort_by=author')
      .then((res) => {
        expect(res.body.articles[0].author).to.equal('rogersop');
        expect(res.body.articles[res.body.articles.length - 1].author).to.equal('butter_bridge');
      }));
    it('GET articles - sorts the articles by any valid column (defaults to date)', () => request.get('/api/articles/?sort_by=article_id')
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(12);
        expect(res.body.articles[11].article_id).to.equal(1);
      }));
    it('GET articles - sorts articles in ascending or descending specified in query', () => request.get('/api/articles/?sort_by=article_id&order=asc')
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(1);
        expect(res.body.articles[res.body.articles.length - 1].article_id).to.equal(12);
      }));
    it('GET articles - sorts articles in ascending or descending specified in query', () => request.get('/api/articles/?sort_by=title&order=asc')
      .then((res) => {
        expect(res.body.articles[0].title).to.equal('A');
        expect(res.body.articles[res.body.articles.length - 1].title).to.equal('Z');
      }));
    it('GET articles - sorts articles in ascending or descending specified in query', () => request.get('/api/articles/?sort_by=title')
      .then((res) => {
        expect(res.body.articles[0].title).to.equal('Z');
        expect(res.body.articles[res.body.articles.length - 1].title).to.equal('A');
      }));
    it('GET articles - handles multiple queries at once', () => request.get('/api/articles/?sort_by=article_id&author=rogersop&order=asc')
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(4);
        expect(res.body.articles[res.body.articles.length - 1].article_id).to.equal(10);
        expect(res.body.articles[0].author).to.equal('rogersop');
      }));
    it('GET articles - handles queries of joined columns (sort_by=comment_count)', () => request.get('/api/articles/?sort_by=comment_count')
      .then((res) => {
        expect(res.body.articles[0].comment_count).to.equal('13');
        expect(res.body.articles[res.body.articles.length - 1].comment_count).to.equal('0');
      }));
    xit('GET articles - handles queries of joined columns (comment_count=0)', () => request.get('/api/articles/?comment_count=13')
      .then((res) => {
        expect(res.body.articles[0].comment_count).to.equal('13');
        expect(res.body.articles.length).to.equal(1);
      }));

    it('POST article - status 201 - responds with the posted object', () => {
      const input = {
        title: 'A title',
        body: 'A body',
        topic: 'mitch',
        username: 'icellusedkars',
      };
      return request.post('/api/articles/').send(input)
        .expect(201)
        .then((res) => {
          expect(res.body.addedArticle[0]).contains.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'body', 'created_at');
        });
    });

    it('GET articles by article_id - status 200 - content objects must contain correct keys including a comment count', () => request.get('/api/articles/5').expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body.article[0]).contains.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        expect(res.body.article[0].article_id).to.equal(5);
      }));
  });
});
