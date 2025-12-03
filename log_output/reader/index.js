const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

// const fs = require("fs");
// const path = require("path");

const app = express();
const port = 3000;
const PING_PONG_SERVICE_URL = "http://ping-pong-svc:2345";

app.get("/", async (req, res) => {
  const response = await axios.get(`${PING_PONG_SERVICE_URL}/pingpong`);
  const timestamp = new Date().toISOString();
  const currentString = crypto.randomUUID();

  res.type("text/plain");
  res.send(`
    ${timestamp}: ${currentString}.\n
    Ping / Pongs: ${response.data.count}
    `);
});

/* OLD CODE */
// const directory = path.join("/", "src", "app", "files");
// const filePath = path.join(directory, "output.log");
// const counterFile = path.join(directory, "pingpong-count.txt");

// app.get("/", async (req, res) => {
// fs.readFile(filePath, "utf8", (err, data) => {
//   if (err) {
//     if (err.code === "ENOENT") {
//       return res.status(404).send("Log file not found");
//     }
//     return res.status(500).send("Error reading log file");
//   }
//   // Read ping-pong counter
//   fs.readFile(counterFile, "utf8", (countErr, countData) => {
//     let pingPongCount = "0";
//     if (!countErr) {
//       pingPongCount = countData.trim();
//     }
//     // Get the last log entry
//     const lines = data.trim().split("\n");
//     const lastEntry = lines[lines.length - 1] || "";
//     res.type("text/plain");
//     res.send(`${lastEntry}\nPing / Pongs: ${pingPongCount}`);
//   });
// });
// });

app.listen(port, () => {
  console.log(`Reader app listening on port ${port}`);
});
