const express = require("express");
const path = require("path");
const catchError = require("./lib/utils/catchError");
const app = express();
const { channelService, messageService } = require("./lib/services");
const http = require("http");
const server = http.Server(app);
const socketIO = require("socket.io");
const io = socketIO(server);

io.on("connection", socket => {
  socket.on("started-typing", user => {
    socket.broadcast.emit("started-typing", user);
  });

  socket.on("stopped-typing", user => {
    socket.broadcast.emit("stopped-typing", user);
  });

  socket.on("message", async message => {
    const { userId, channelId, text } = message;
    const createdAt = Date.now();
    const createdMessage = await messageService.createMessage(
      userId,
      channelId,
      createdAt,
      text
    );

    socket.send(createdMessage);
    socket.broadcast.send(createdMessage);
  });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get(
  "/api/v1/channels",
  catchError(async (req, res) => {
    const channels = await channelService.getChannels();
    res.json(channels);
  })
);

app.post(
  "/api/v1/channels",
  catchError(async (req, res) => {
    const { name } = req.body;
    const channel = await channelService.createChannel(name);
    res.json(channel);
  })
);

app.all(
  "*",
  catchError((req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  })
);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ error: error.message });
});

module.exports = server;
