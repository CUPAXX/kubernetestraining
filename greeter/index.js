const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const version = process.env.VERSION || "v1";

app.get("/", (req, res) => {
  res.json({
    greeting: `Hello from version ${version}`,
    version: version,
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", version: version });
});

app.listen(port, () => {
  console.log(`Greeter service ${version} listening on port ${port}`);
});
