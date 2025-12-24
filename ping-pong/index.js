const express = require("express");
const db = require("./helpers/db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3002;

app.get("/", async (req, res) => {
  try {
    await db.query("UPDATE counter SET value = value + 1 WHERE id = 1");

    const result = await db.query("SELECT value FROM counter WHERE id = 1");

    res.json({ count: result.rows[0].value });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/ready", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send("DB not ready");
  }
});

// app.get("/pingpong", async (req, res) => {
//   try {
//     await db.query("UPDATE counter SET value = value + 1 WHERE id = 1");

//     const result = await db.query("SELECT value FROM counter WHERE id = 1");

//     res.json({ count: result.rows[0].value });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Database error");
//   }
// });

app.listen(port, "0.0.0.0", () => console.log(`Server started on ${port}`));

// (async () => {
//   try {
//     await db.query("SELECT 1");
//     console.log("DB ready");
//     app.listen(port, "0.0.0.0", () => console.log(`Server started on ${port}`));
//   } catch (err) {
//     console.error("DB not ready", err);
//     process.exit(1);
//   }
// })();
