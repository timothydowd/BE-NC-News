const { getUsers, addUser } = require('../models/usersModel');

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};


exports.sendAddedUser = (req, res, next) => {
  const userBody = req.body;
  addUser(userBody)
    .then((singleAddedUser) => {
      const [arrayDestructuredUser] = singleAddedUser;
      res.status(201).send({ addedUser: arrayDestructuredUser });
    })
    .catch((err) => {
      next(err);
    });
};

exports.sendUserByUserName = (req, res, next) => {
  const userName = req.params;
  getUsers(userName)
    .then((singleUser) => {
      if (singleUser.length === 0) next({ code: 'userNotFound', detail: 'username does not exist' });
      else {
        const [arrayDestructuredUser] = singleUser;
        res.status(200).send({ user: arrayDestructuredUser });
      }
    })
    .catch((err) => {
      next(err);
    });
};
