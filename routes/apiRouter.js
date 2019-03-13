const apiRouter = require('express').Router();
const { usersRouter } = require('./usersRouter');
const { topicsRouter } = require('./topicsRouter');
const { articlesRouter } = require('./articlesRouter');
const { commentsRouter } = require('./commentsRouter');

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = { apiRouter };
