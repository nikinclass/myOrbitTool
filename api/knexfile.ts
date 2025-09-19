// Update with your config settings.
import "dotenv/config";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
let hasErrors = false;

if (typeof process.env.DATABASE_HOST !== "string") {
  hasErrors = true;
  console.error(
    "\x1b[31m[ERROR] ",
    "Missing env variable for string DATABASE_HOST"
  );
}

if (typeof process.env.POSTGRES_PORT !== "string") {
  hasErrors = true;
  console.error(
    "\x1b[31m[ERROR] ",
    "Missing env variable for string POSTGRES_PORT"
  );
}

if (typeof process.env.POSTGRES_DB !== "string") {
  hasErrors = true;
  console.error(
    "\x1b[31m[ERROR] ",
    "Missing env variable for string POSTGRES_DB"
  );
}
if (typeof process.env.POSTGRES_USER !== "string") {
  hasErrors = true;
  console.error(
    "\x1b[31m[ERROR] ",
    "Missing env variable for string POSTGRES_USER"
  );
}
if (typeof process.env.POSTGRES_PASSWORD !== "string") {
  hasErrors = true;
  console.error(
    "\x1b[31m[ERROR] ",
    "Missing env variable for string POSTGRES_PASSWORD"
  );
}

if (!hasErrors) {
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
} 
