
const {
  getArticles, addArticle, updateVotes, deleteArticle, getComments, addComment,
} = require('../models/articlesModel');

const { checkUserOrTopicExists } = require('../utils/checkUserOrTopicExists');
const { formatQuery } = require('../utils/queryFormatter');

exports.sendArticles = (req, res, next) => {
  const { sort_by, order, conditions } = formatQuery(req.query);
  if (order === 'invalidInput') next({ code: 'orderErr', detail: 'sort by order must be asc or desc.' });
  else {
    return Promise.all([getArticles(sort_by, order, conditions), checkUserOrTopicExists(req)])
      .then(([articles, userOrTopicExists]) => {
      // if(articles.length === 0) next({ code: 'notFound', detail: 'record not found' })
        if (articles.length !== 0) res.status(200).send({ articles });
        if (articles.length === 0 && userOrTopicExists === true) res.status(200).send({ articles });
        else {
          next(userOrTopicExists.notFoundMsg);
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.sendArticlesByArticleId = (req, res, next) => { // if a query but not a sort query
  let sortBy;
  let order;
  const conditions = {};
  conditions[`articles.${Object.keys(req.params)[0]}`] = req.params.article_id;


  getArticles(sortBy, order, conditions)
    .then((article) => {
      if (article.length === 0) next({ code: 'articleIdNotFound', detail: 'article_id does not exist' });
      else res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};


exports.sendAddedArticle = (req, res, next) => {
  const authoredBody = {
    title: req.body.title,
    body: req.body.body,
    topic: req.body.topic,
    author: req.body.username,
  };

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

  if (!newVote || !Number.isInteger(newVote) || Object.keys(req.body).length !== 1) {
    next({ code: 'incVoteInvalid', detail: 'Number of votes not specified / invalid entry type / invalid entry field' });
  } else {
    updateVotes(articleId, newVote)
      .then((updatedArticle) => {
        res.status(202).send({ updatedArticle });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.sendStatusDeleted = (req, res, next) => {
  let sortBy;
  let order;
  const conditions = {};
  conditions[`articles.${Object.keys(req.params)[0]}`] = req.params.article_id;

  getArticles(sortBy, order, conditions)
    .then((article) => {
      if (article.length === 0) next({ code: 'articleIdNotFound', detail: 'article_id does not exist' });
      else {
        const articleId = req.params;
        deleteArticle(articleId)
          .then(() => res.sendStatus(204));
      }
    })
    .catch((err) => {
      next(err);
    });
};


exports.sendCommentsByArticleId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const conditions = {};
  conditions[`articles.${Object.keys(req.params)[0]}`] = req.params.article_id;

  getArticles(sort_by, order, conditions)
    .then((article) => {
      if (article.length === 0) next({ code: 'articleIdNotFound', detail: 'article_id does not exist' });
      else {
        const articleId = req.params;
        getComments(articleId, sort_by, order)
          .then((commentsByArticleId) => {
            res.status(200).send({ commentsByArticleId });
          });
      }
    })
    .catch((err) => {
      next(err);
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
    })
    .catch((err) => {
      next(err);
    });
};
