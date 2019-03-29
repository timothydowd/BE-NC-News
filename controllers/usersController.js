const { getUsers, addUser } = require('../models/usersModel');

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    });
};


exports.sendAddedUser = (req, res, next) => {
  const userBody = req.body;
  addUser(userBody)
    .then((addedUser) => {
      res.status(201).send({ addedUser });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendUserByUserName = (req, res, next) => {
  const userName = req.params;
  getUsers(userName)
    .then((user) => {
      if (user.length === 0) next({ code: 'userNotFound', detail: 'username does not exist' });
      else res.status(200).send({ user });
    });
};
