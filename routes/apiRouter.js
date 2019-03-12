const apiRouter = require('express').Router();
const { usersRouter } = require('./usersRouter');
const { topicsRouter } = require('./topicsRouter');


apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);


module.exports = { apiRouter };
