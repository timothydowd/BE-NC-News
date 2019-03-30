
const knex = require('knex');

const ENV = process.env.NODE_ENV || 'development';
const completeConfig = ENV === 'production' ? { client: 'pg', connection: process.env.DATABASE_URL } : require('../knexfile');

module.exports = { connection: knex(completeConfig) };
