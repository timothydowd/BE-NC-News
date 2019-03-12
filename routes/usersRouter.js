const usersRouter = require('express').Router();
const { sendUsers } = require('../controllers/usersController');

usersRouter.route('/').get(sendUsers);

module.exports = { usersRouter };
