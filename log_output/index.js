const express = require("express");
const crypto = require("crypto");

const app = express();
const port = 3000;
const startingString = crypto.randomUUID();
const startingTimestamp = new Date().toISOString();

app.get("/", (req, res) => {
  const timestamp = new Date().toISOString();
  const currentString = crypto.randomUUID();
  res.send(`Responding with ${timestamp}: ${currentString}`);
});

app.listen(port, () => {
  console.log(`Started with ${startingTimestamp}: ${startingString}`);
});
