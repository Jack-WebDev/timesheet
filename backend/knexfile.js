// Update with your config settings.
const dotenv = require("dotenv")
dotenv.config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {


  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },



};
