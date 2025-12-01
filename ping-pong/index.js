const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

let counter = 0;
const sharedDir = path.join("/", "src", "app", "files");
const counterFile = path.join(sharedDir, "pingpong-count.txt");

// Ensure shared directory exists
if (!fs.existsSync(sharedDir)) {
  fs.mkdirSync(sharedDir, { recursive: true });
}

// Initialize counter file if it doesn't exist
if (!fs.existsSync(counterFile)) {
  fs.writeFileSync(counterFile, "0");
}

app.get("/", (req, res) => {
  res.send("Ping-Pong-apps Backend!");
});

app.get("/pingpong", (req, res) => {
  counter++;
  // Write counter to persistent volume
  fs.writeFileSync(counterFile, counter.toString());
  res.send(`pong ${counter}`);
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
