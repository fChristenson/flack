const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", socket => {
  socket.on("message", message => {
    console.log(message);
    console.log("--------------------------");
  });
});

app.use(express.static(path.join(__dirname, "..", "dist")));

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

module.exports = server;
