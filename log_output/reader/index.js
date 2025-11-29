const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;
const directory = path.join("/", "src", "app", "files");
const filePath = path.join(directory, "output.log");
// const LOG_FILE = process.env.LOG_FILE || "/src/app/files/output.log";

app.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(404).send("Log file not found");
      }
      return res.status(500).send("Error reading log file");
    }

    res.type("text/plain");
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Reader app listening on port ${port}`);
});
