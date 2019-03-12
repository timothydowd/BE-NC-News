const { connection } = require('../connection');

exports.getTopics = () => connection('topics').select('*');
