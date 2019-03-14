const usersRouter = require('express').Router();
const { sendUsers, sendAddedUser, sendUserByUserName } = require('../controllers/usersController');

usersRouter.route('/').get(sendUsers)
  .post(sendAddedUser);

usersRouter.route('/:username').get(sendUserByUserName);


module.exports = { usersRouter };
