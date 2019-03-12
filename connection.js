const knex = require('knex');
const completeConfig = require('./knexfile');

const connection = knex(completeConfig);

module.exports = { connection };
