const { connection } = require('../db/connection');

exports.getUsers = (userName = {}) => connection('users').select('*').where(userName);

exports.addUser = data => connection('users').insert(data).returning('*');
