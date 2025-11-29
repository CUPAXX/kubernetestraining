const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;
const startingString = crypto.randomUUID();
const startingTimestamp = new Date().toISOString();
const directory = path.join("/", "src", "app", "files");
const filePath = path.join(directory, "output.log");
// const LOG_FILE = process.env.LOG_FILE || "/src/app/files/output.log";

// if (fs.existsSync(LOG_FILE) && fs.lstatSync(LOG_FILE).isDirectory()) {
//   console.error("FATAL: output.log is a directory");
//   process.exit(1);
// }

const writeLog = () => {
  const timestamp = new Date().toISOString();
  const currentString = crypto.randomUUID();
  const line = `${timestamp}: ${currentString}\n`;

  fs.appendFile(filePath, line, (err) => {
    if (err) {
      console.error("Failed to write a log", err);
    }
  });
};

writeLog();
setInterval(writeLog, 5000);

app.get("/", (req, res) => {
  const timestamp = new Date().toISOString();
  const currentString = crypto.randomUUID();
  res.send(`Responding with ${timestamp}: ${currentString}`);
});

app.listen(port, () => {
  console.log(`Started with ${startingTimestamp}: ${startingString}`);
});
