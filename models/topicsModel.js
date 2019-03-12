const { connection } = require('../connection');

exports.getTopics = () => connection('topics').select('*');

exports.addTopic = data => connection('topics').insert(data).returning('*');
