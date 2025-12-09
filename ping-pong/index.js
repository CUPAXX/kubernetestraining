const express = require("express");
const db = require("./helpers/db");
require("dotenv").config();

const app = express();
const port = 3002;

app.get("/", (req, res) => {
  res.send("Ping-Pong-apps Backend!");
});

app.get("/pingpong", async (req, res) => {
  try {
    await db.query("UPDATE counter SET value = value + 1 WHERE id = 1");

    const result = await db.query("SELECT value FROM counter WHERE id = 1");

    res.json({ count: result.rows[0].value });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

(async () => {
  try {
    await db.query("SELECT 1");
    console.log("DB ready");
    app.listen(port, () => console.log(`Server started on ${port}`));
  } catch (err) {
    console.error("DB not ready", err);
    process.exit(1);
  }
})();
