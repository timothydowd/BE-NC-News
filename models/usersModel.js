const { connection } = require('../connection');

exports.getUsers = () => connection('users').select('*');
