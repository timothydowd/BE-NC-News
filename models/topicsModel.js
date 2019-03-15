const { connection } = require('../connection');

exports.getTopics = (topic = {}) => connection('topics').select('*').where(topic);

exports.addTopic = data => connection('topics').insert(data).returning('*');
