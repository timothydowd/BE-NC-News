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

describe('/api', () => {
  beforeEach(() => connection.seed.run());

  after(() => connection.destroy());


  it('1-GET all endpoints - status:200 responds with a json containing all endpoints', () => request.get('/api/').expect(200)
    .then((res) => {
      expect(res.body.endpoints).to.contains.keys('/api', '/api/users', '/api/topics', '/api/articles', '/api/articles:article_id', '/api/articles/:article_id/comments', '/api/comments/:comment_id');
    }));

  describe('error handling', () => {
    it('2-GET error handling - status 404 for unavailable route', () => request.get('/api/dsdsd').expect(404)
      .then((res) => {
        expect(res.body.message).to.equal('404 - incorrect route');
      }));
  });


  describe('/topics', () => {
    it('3-GET topics - status:200 responds with an array of topics', () => request.get('/api/topics/')
      .then((res) => {
        expect(res.body.topics).to.be.an('array');
        expect(res.body.topics.length).to.equal(2);
        expect(res.body.topics[1]).to.eql({
          slug: 'cats',
          description: 'Not dogs',
        });
      }));

    it('4-GET topics - content objects must contain the keys slug and description', () => request.get('/api/topics/').expect(200)
      .then((res) => {
        expect(res.body.topics[0]).contains.keys('slug', 'description');
      }));


    it('5-POST topic - status 201 - responds with the posted object', () => {
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

    describe('error handling', () => {
      it('6-POST topic - status 400 - missing slug or description', () => {
        const input = {};

        return request.post('/api/topics/').send(input)
          .expect(400)
          .then((res) => {
            expect(res.body.msg).to.eql('400 - Failing row contains (null, null).');
          });
      });
      it('7-POST topic - status 422 - inputting a slug that already exists', () => {
        const input = {
          slug: 'mitch',
          description: 'description here',
        };

        return request.post('/api/topics/').send(input)
          .expect(422)
          .then((res) => {
            expect(res.body.msg).to.eql('422 - Key (slug)=(mitch) already exists.');
          });
      });
    });
  });


  describe('/articles', () => {
    it('8-GET articles - status:200 responds with an array of articles', () => request.get('/api/articles/').expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.an('array');
      }));
    it('9-GET articles - content objects must contain correct keys including a comment count', () => request.get('/api/articles/')
      .then((res) => {
        expect(res.body.articles[0]).contains.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
      }));
    it('10-GET articles - content object must contain correct number of comments in comment_count', () => request.get('/api/articles/')
      .then((res) => {
        expect(res.body.articles[0].comment_count).to.equal('13');
      }));
    it('11-GET articles - filters the articles by the username value specified in the query', () => request.get('/api/articles/?author=rogersop')
      .then((res) => {
        expect(res.body.articles.length).to.eql(3);
        expect(res.body.articles[0].author).to.equal('rogersop');
        expect(res.body.articles[1].author).to.equal('rogersop');
        expect(res.body.articles[2].author).to.equal('rogersop');
      }));
    it('12-GET articles - filters the articles by the topic value specified in the query', () => request.get('/api/articles/?topic=mitch')
      .then((res) => {
        expect(res.body.articles.length).to.eql(11);
        expect(res.body.articles[0].topic).to.equal('mitch');
        expect(res.body.articles[1].topic).to.equal('mitch');
        expect(res.body.articles[2].topic).to.equal('mitch');
      }));
    it('13-GET articles - sorts the articles by any valid column (defaults to date)', () => request.get('/api/articles/?sort_by=author')
      .then((res) => {
        expect(res.body.articles[0].author).to.equal('rogersop');
        expect(res.body.articles[res.body.articles.length - 1].author).to.equal('butter_bridge');
      }));
    it('14-GET articles - sorts the articles by any valid column (defaults to date)', () => request.get('/api/articles/?sort_by=article_id')
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(12);
        expect(res.body.articles[11].article_id).to.equal(1);
      }));
    it('15-GET articles - sorts articles in ascending or descending specified in query', () => request.get('/api/articles/?sort_by=article_id&order=asc')
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(1);
        expect(res.body.articles[res.body.articles.length - 1].article_id).to.equal(12);
      }));
    it('16-GET articles - sorts articles in ascending or descending specified in query', () => request.get('/api/articles/?sort_by=title&order=asc')
      .then((res) => {
        expect(res.body.articles[0].title).to.equal('A');
        expect(res.body.articles[res.body.articles.length - 1].title).to.equal('Z');
      }));
    it('17-GET articles - sorts articles in ascending or descending specified in query', () => request.get('/api/articles/?sort_by=title')
      .then((res) => {
        expect(res.body.articles[0].title).to.equal('Z');
        expect(res.body.articles[res.body.articles.length - 1].title).to.equal('A');
      }));
    it('18-GET articles - handles multiple queries at once', () => request.get('/api/articles/?sort_by=article_id&author=rogersop&order=asc')
      .then((res) => {
        expect(res.body.articles[0].article_id).to.equal(4);
        expect(res.body.articles[res.body.articles.length - 1].article_id).to.equal(10);
        expect(res.body.articles[0].author).to.equal('rogersop');
      }));
    it('19-GET articles - handles queries of joined columns (sort_by=comment_count)', () => request.get('/api/articles/?sort_by=comment_count')
      .then((res) => {
        expect(res.body.articles[0].comment_count).to.equal('13');
        expect(res.body.articles[res.body.articles.length - 1].comment_count).to.equal('0');
      }));
    xit('20-GET articles - handles queries of joined columns (comment_count=0)', () => request.get('/api/articles/?comment_count=13')
      .then((res) => {
        expect(res.body.articles[0].comment_count).to.equal('13');
        expect(res.body.articles.length).to.equal(1);
      }));

    it('21-POST article - status 201 - responds with the posted object', () => {
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

    it('22-GET articles by article_id - status 200 - content objects must contain correct keys including a comment count', () => request.get('/api/articles/5').expect(200)
      .then((res) => {
        expect(res.body.article[0]).contains.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
        expect(res.body.article[0].article_id).to.equal(5);
      }));

    it('23-PATCH article by article_id - status 202 - responds with the updated article with 1 added vote', () => {
      const input = {
        inc_votes: 1,
      };
      return request.patch('/api/articles/1').send(input)
        .expect(202)
        .then((res) => {
          expect(res.body.updatedArticle[0].votes).to.equal(101);
        });
    });
    it('24-PATCH article by article_id - responds with the updated article with 50 minused votes', () => {
      const input = {
        inc_votes: -50,
      };
      return request.patch('/api/articles/1').send(input)
        .then((res) => {
          expect(res.body.updatedArticle[0].votes).to.equal(50);
        });
    });
    it('25-PATCH article by article_id - status 202 - responds with the correct keys', () => {
      const input = {
        inc_votes: 1,
      };
      return request.patch('/api/articles/5').send(input)
        .then((res) => {
          console.log(res.body.msg);
          expect(res.body.updatedArticle[0]).contains.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'body');
        });
    });

    it('26-DELETE article by article_id - status 204 - responds with 204', () => request.delete('/api/articles/5').expect(204));


    it('27-GET comments by article_id - status 200 - content objects must contain correct keys including a comment count and must be an array', () => request.get('/api/articles/1/comments').expect(200)
      .then((res) => {
        expect(res.body.commentsByArticleId[0]).contains.keys('comment_id', 'votes', 'created_at', 'author', 'body');
        expect(res.body.commentsByArticleId).to.be.an('array');
      }));

    it('28-GET comments by article_id - status 200 - contents must sort by any column', () => request.get('/api/articles/1/comments/?sort_by=votes').expect(200)
      .then((res) => {
        expect(res.body.commentsByArticleId[0].votes).to.equal(100);
        expect(res.body.commentsByArticleId[1].votes).to.equal(16);
        expect(res.body.commentsByArticleId[2].votes).to.equal(14);
      }));

    it('29-GET comments by article_id - status 200 - contents must sort by any column', () => request.get('/api/articles/1/comments/?sort_by=author&&order=asc')
      .then((res) => {
        expect(res.body.commentsByArticleId[0].author).to.equal('butter_bridge');
        expect(res.body.commentsByArticleId[res.body.commentsByArticleId.length - 1].author).to.equal('icellusedkars');
      }));
    it('30-POST comments - status 201 - responds with the posted object', () => {
      const input = {
        body: 'I actually do sell used cars',
        username: 'icellusedkars',
      };
      return request.post('/api/articles/1/comments').send(input)
        .expect(201)
        .then((res) => {
          expect(res.body.addedComment[0]).contains.keys('comment_id', 'author', 'article_id', 'created_at', 'votes', 'body');
        });
    });

    describe('error handling', () => {
      it('31-GET - 400 -sort_by a column that doesnt exist', () => request.get('/api/articles?sort_by=chocolate')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.eql('400 - bad request');
        }));
      it('32-GET - 400 - sort order is something other than asc or desc', () => request.get('/api/articles?sort_by=author&&order=harold')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).to.eql('400 - sort by order must be asc or desc.');
        }));
      it('33-GET - 404 - author/ topic is not in the database', () => request.get('/api/articles?author=margaret')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.eql('404 - The user margaret does not exist');
        }));

      it('34-GET - 200 -`author` / `topic` that exists but does not have any articles associated with it { articles: [] }', () => {
        const input = {
          username: 'cyrilsneer',
          avatar_url: 'img',
          name: 'cyril',
        };
        return request.post('/api/users').send(input).expect(201)
          .then(res => request.get('/api/articles?author=cyrilsneer').expect(200)
            .then((res) => {
              expect(res.body).to.eql({
                articles: [],
              });
            }));
      });

      it('35-POST 400 - No `title` / `body` / `topic` / `username` in request body', () => {
        const input = {
          title: 'A title',
          body: 'A body',
          topic: 'mitch',
        };
        return request.post('/api/articles').send(input)
          .expect(400)
          .then((res) => {
            expect(res.body.msg.substring(0, 63)).to.equal('400 - Failing row contains (13, A title, A body, 0, mitch, null');
          });
      });

      it('36-POST 400 - `topic` / `username` that doesnt exist: 400', () => {
        const input = {
          title: 'A title',
          body: 'A body',
          topic: 'notatopic',
          username: 'icellusedkars',
        };
        return request.post('/api/articles').send(input)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Key (topic)=(notatopic) is not present in table "topics".');
          });
      });

      it('36a- GET 400- Bad `article_id` (e.g. `/dog`)', () => request.get('/api/articles/dog').expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('400 - Invalid article_id/comment_id');
        }));

      it('36b- GET 400- Well formed `article_id` that doesn\'t exist in the database ', () => request.get('/api/articles/9999').expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('404 - article_id does not exist');
        }));

      it('36c-PATCH article by article_id - No inc_votes on request body', () => {
        const input = {};
        return request.patch('/api/articles/1').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Number of votes not specified / invalid entry type / invalid entry field');
          });
      });

      it('36d-PATCH - Invalid `inc_votes` (e.g. `{ inc_votes : "cat" }`)', () => {
        const input = {
          inc_votes: 'cat',
        };
        return request.patch('/api/articles/1').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Number of votes not specified / invalid entry type / invalid entry field');
          });
      });

      it('36e - PATCH - Some other property on request body (e.g. `{ inc_votes : 1, name: "Mitch" }', () => {
        const input = {
          inc_votes: 1,
          name: 'Mitch',
        };
        return request.patch('/api/articles/1').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Number of votes not specified / invalid entry type / invalid entry field');
          });
      });

      it('36f - DELETE - article_id that doesn\'t exist in the database', () => request.delete('/api/articles/999').expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('404 - article_id does not exist');
        }));

      it('36g - DELETE - bad article id', () => request.delete('/api/articles/cat').expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('400 - Invalid article_id/comment_id');
        }));

      it('36h - GET - get comments for article id that doesn\'t exist in the database', () => request.get('/api/articles/9999/comments').expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('404 - article_id does not exist');
        }));
      it('36i - GET - article id exists but no associated comments', () => request.get('/api/articles/2/comments').expect(200)
        .then((res) => {
          expect(res.body).to.eql({
            commentsByArticleId: [],
          });
        }));
      it('36j- GET 400-  get comments for bad `article_id` (e.g. `/dog`)', () => request.get('/api/articles/dog/comments').expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('400 - Invalid article_id/comment_id');
        }));

      it('36k - POST - post comments by article id - Some incorrect property In request body (e.g. `{ username: "icellusedkars", name: "Mitch" }', () => {
        const input = {
          name: 'Mitch',
          username: 'icellusedkars',
        };
        return request.post('/api/articles/1/comments').send(input).expect(400)
          .then((res) => {
            console.log(res.error);
            expect(res.body.msg).to.equal('400 - bad request');
          });
      });

      it('36l - POST - post comments for a username that does not exist', () => {
        const input = {
          body: 'yada yada yada',
          username: 'terrytibbs',
        };
        return request.post('/api/articles/1/comments').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Key (author)=(terrytibbs) is not present in table "users".');
          });
      });

      it('36m - POST - post comments using an article id that does not exist', () => {
        const input = {
          body: 'yada yada yada',
          username: 'icellusedkars',
        };
        return request.post('/api/articles/576839/comments').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Key (article_id)=(576839) is not present in table "articles".');
          });
      });

      it('36n - POST - post comments using an article id that is invalid', () => {
        const input = {
          body: 'yada yada yada',
          username: 'icellusedkars',
        };
        return request.post('/api/articles/hi/comments').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Invalid article_id/comment_id');
          });
      });
    });
  });

  describe('/comments', () => {
    it('37-PATCH comment by comment_id - status 202 - responds with the updated comment with 1 added vote', () => {
      const input = {
        inc_votes: 1,
      };
      return request.patch('/api/comments/2').send(input)
        .expect(202)
        .then((res) => {
          expect(res.body.updatedComment[0].votes).to.equal(15);
        });
    });
    it('38-PATCH comment by comment_id - responds with the updated article with 50 minused votes', () => {
      const input = {
        inc_votes: -50,
      };
      return request.patch('/api/comments/4').send(input)
        .then((res) => {
          expect(res.body.updatedComment[0].votes).to.equal(-150);
        });
    });
    it('39-PATCH comment by comment_id - status 202 - responds with the correct keys', () => {
      const input = {
        inc_votes: 1,
      };
      return request.patch('/api/comments/4').send(input)
        .then((res) => {
          expect(res.body.updatedComment[0]).contains.keys('comment_id', 'author', 'article_id', 'votes', 'created_at', 'body');
        });
    });

    it('40-DELETE comment by comment_id - status 204 - responds with 204', () => request.delete('/api/comments/5').expect(204)
      .then(() => {

      }));

    describe('error handling', () => {
      it('40a-PATCH comment by comment_id - No inc_votes on request body', () => {
        const input = {};
        return request.patch('/api/comments/1').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Number of votes not specified / invalid entry type / invalid entry field');
          });
      });

      it('40b - PATCH comment by comment_id- Invalid `inc_votes` (e.g. `{ inc_votes : "cat" }`)', () => {
        const input = {
          inc_votes: 'cat',
        };
        return request.patch('/api/comments/1').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Number of votes not specified / invalid entry type / invalid entry field');
          });
      });

      it('40c - PATCH comment by comment_id- Invalid property in req.body', () => {
        const input = {
          inc_votes: 2,
          vegetable: 'turnip',
        };
        return request.patch('/api/comments/1').send(input).expect(400)
          .then((res) => {
            expect(res.body.msg).to.equal('400 - Number of votes not specified / invalid entry type / invalid entry field');
          });
      });

      it('40d 400 - DELETE comment by comment_id that does not exist', () => request.delete('/api/comments/9999').expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('404 - comment_id does not exist');
        }));

      it('40e 400 - DELETE comment by invalid comment_id', () => request.delete('/api/comments/cat').expect(400)
        .then((res) => {
          expect(res.body.msg).to.equal('400 - Invalid article_id/comment_id');
        }));
    });
  });

  describe('/users', () => {
    it('41-GET users - status:200 responds with an array of users', () => request.get('/api/users/').expect(200)
      .then((res) => {
        expect(res.body.users).to.be.an('array');
        expect(res.body.users[1]).to.eql({
          username: 'icellusedkars',
          name: 'sam',
          avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
        });
      }));

    it('42-GET users - content objects must contain the keys username, name and avatar_url', () => request.get('/api/users/')
      .then((res) => {
        expect(res.body.users[0]).contains.keys('username', 'name', 'avatar_url');
      }));

    it('43-GET users by username - content objects must contain the keys username, name and avatar_url', () => request.get('/api/users/icellusedkars').expect(200)
      .then((res) => {
        const output = {
          user: [{
            username: 'icellusedkars',
            name: 'sam',
            avatar_url: 'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
          }],
        };
        expect(res.body.user[0]).contains.keys('username', 'name', 'avatar_url');
        expect(res.body).to.eql(output);
      }));

    it('44-POST user - status 201 - responds with the posted object', () => {
      const input = {
        username: 'cyrilsneer',
        avatar_url: 'img',
        name: 'cyril',
      };

      const output = {
        addedUser: [{
          username: 'cyrilsneer',
          name: 'cyril',
          avatar_url: 'img',
        }],
      };

      return request.post('/api/users/').send(input)
        .expect(201)
        .then((res) => {
          expect(res.body.addedUser[0]).contains.keys('username', 'avatar_url', 'name');
          expect(res.body).to.eql(output);
        });
    });
  });
});
