
/*
const knex = require('knex');
const completeConfig = require('./knexfile');

const connection = knex(completeConfig);

module.exports = { connection };
*/

const ENV = process.env.NODE_ENV || 'development';
const completeConfig = ENV === 'production' ? { client: 'pg', connection: process.env.DATABASE_URL } : require('./knexfile');

module.exports = require('knex')(completeConfig);
