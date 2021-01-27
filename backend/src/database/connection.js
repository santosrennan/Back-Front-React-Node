const knex = require('knex');

const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;

/* Comandos para migrations npx knex migrate:make create_users_table
npx knex migrate:latest */