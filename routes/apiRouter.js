const apiRouter = require('express').Router();
const { usersRouter } = require('./usersRouter');
const { topicsRouter } = require('./topicsRouter');
const { articlesRouter } = require('./articlesRouter');
const { commentsRouter } = require('./commentsRouter');
const { sendEndPoints } = require('../controllers/endPointController');

apiRouter.get('/', sendEndPoints);
apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);

module.exports = { apiRouter };
