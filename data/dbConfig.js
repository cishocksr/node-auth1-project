const knex = require('knex');

const knexconfig = require('../knexfile')

module.exports = knex(knexconfig.development)