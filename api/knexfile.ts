// Update with your config settings.
import "dotenv/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

console.log(process.env.DATABASE_HOST, process.env.POSTGRES_PORT, process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD)
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST,
      port: process.env.POSTGRES_PORT,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    },
  },
};
