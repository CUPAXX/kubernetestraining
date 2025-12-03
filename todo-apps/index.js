const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todo_maps = [
  "Learn Kubernetes",
  "Build a project",
  "Deploy to kubernetes",
];

app.get("/todos", (req, res) => {
  res.json(todo_maps);
});

app.post("/todos", (req, res) => {
  let title = req.body.title;
  todo_maps.push(title);
  res.status(200).json({ message: "Todo added" });
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
