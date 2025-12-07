const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT || 5432,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

db.on("connect", () => {
  console.log("Connected to Postgres");
});

db.on("error", (err) => {
  console.error("Postgres db connection error", err);
  process.exit(1);
});

module.exports = db;
