const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "..", "dist")));

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

module.exports = app;
