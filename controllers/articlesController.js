
const {
  getArticles, addArticle, updateVotes, deleteArticle, getComments, addComment,
} = require('../models/articlesModel');
const { getUsers } = require('../models/usersModel')
const { getTopics } = require('../models/topicsModel')



exports.sendArticles = (req, res, next) => {

  const conditions = {}
  let {
    sort_by,
    order
  } = req.query

  
  //const author = {username: req.query}

  if (sort_by !== 'comment_count' && sort_by !== undefined) sort_by = `articles.${req.query.sort_by}`
  if (order !== 'asc' && order !== 'desc' && order !== undefined) next({ code: 'orderErr', detail: 'sort by order must be asc or desc.' });
  
  for (key in req.query) {
    if (key !== 'sort_by' && key !== 'order') {
      conditions[`articles.${key}`] = req.query[key]; // all this formats the res.query  so it can be accepted by get articles
    }
  }

  console.log(req.query)
    
  console.log(conditions)
    //console.log(author, topic)
   /* 

    return Promise.all([getArticles(sort_by, order, conditions), getUsers({username: author}), getTopics(topic)])
    .then(([articles, users, topics]) => {
      console.log('articles: ',articles)
      console.log('users: ',users)
      console.log('topics: ',topics)
    })
    */

  
  getArticles(sort_by, order, conditions)
    .then((articles) => {
      if (articles.length === 0) next({ code: 'notFound', detail: 'record not found' });
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
  
};




exports.sendArticlesByArticleId = (req, res, next) => { // if a query but not a sort query
  let sortBy;
  let order;
  const conditions = {};
  conditions[`articles.${Object.keys(req.params)[0]}`] = req.params.article_id;

  getArticles(sortBy, order, conditions)
    .then((article) => {
      if (article.length === 0) next({ code: 404, detail: 'Article not found' });
      else res.status(200).send({ article });
    });
};


exports.sendAddedArticle = (req, res, next) => {
  const authoredBody = req.body;
  authoredBody.author = authoredBody.username;
  delete authoredBody.username;
  addArticle(authoredBody)
    .then((addedArticle) => {
      res.status(201).send({ addedArticle });
    })
    .catch((err) => {
      next(err);
    });
};


exports.sendVoteUpdatedArticle = (req, res, next) => {
  const newVote = req.body.inc_votes;
  const articleId = req.params;

  updateVotes(articleId, newVote)
    .then((updatedArticle) => {
      res.status(202).send({ updatedArticle });
    });
};

exports.sendStatusDeleted = (req, res, next) => {
  const articleId = req.params;
  deleteArticle(articleId)
    .then(() => res.sendStatus(204));
};


exports.sendCommentsByArticleId = (req, res, next) => {
  const articleId = req.params;
  let sortBy;
  let order;

  for (const key in req.query) {
    if (key === 'sort_by') sortBy = req.query[key];
    if (key === 'order') order = req.query[key];
  }

  getComments(articleId, sortBy, order)
    .then((commentsByArticleId) => {
      res.status(200).send({ commentsByArticleId });
    });
};


exports.sendAddedComment = (req, res, next) => {
  const authoredBody = req.body;
  authoredBody.article_id = req.params.article_id;
  authoredBody.author = authoredBody.username;
  delete authoredBody.username;

  addComment(authoredBody)
    .then((addedComment) => {
      res.status(201).send({ addedComment });
    });
};
