const express = require("express");
require("dotenv").config();
const db = require("./helpers/db");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const todo_maps = [
//   "Learn Kubernetes",
//   "Build a project",
//   "Deploy to kubernetes",
// ];

app.get("/todos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todo");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.post("/todos", async (req, res) => {
  let title = req.body.title;

  try {
    const result = await db.query(
      `INSERT INTO todo (title) VALUES ('${title}')`
    );
    if (result.rowCount > 0)
      return res.status(200).json({ message: "Todo added" });
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
