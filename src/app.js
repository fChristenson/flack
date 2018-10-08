const express = require("express");
const path = require("path");
const catchError = require("./lib/utils/catchError");
const UserView = require("./lib/services/userService/UserView");
const config = require("./config");
const app = express();
const isLoggedIn = require("./lib/utils/isLoggedIn");
const isLoggedInWithRedirect = require("./lib/utils/isLoggedInWithRedirect");
const {
  channelService,
  messageService,
  userService
} = require("./lib/services");
const http = require("http");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
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
    const createdMessage = await messageService.createMessageView(
      userId,
      channelId,
      createdAt,
      text
    );

    socket.emit("my-message", createdMessage);
    socket.broadcast.send(createdMessage);
  });
});

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    name: "flack-session",
    secret: process.env.SECRET || "secret",
    store: new MongoStore({
      url: config.url
    })
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get(
  "/",
  isLoggedInWithRedirect,
  catchError((req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "main.html"));
  })
);

app.get(
  "/register",
  catchError(async (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
  })
);

app.get(
  "/login",
  catchError(async (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
  })
);

app.get(
  "/logout",
  catchError(async (req, res) => {
    req.session.destroy();
    res.redirect("/login");
  })
);

app.post(
  "/register",
  catchError(async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.registerUser(username, password);
    req.session.userId = user.id;
    res.redirect("/");
  })
);

app.post(
  "/login",
  catchError(async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    req.session.userId = user.id;
    res.redirect("/");
  })
);

app.get(
  "/api/v1/logged-in",
  catchError(async (req, res) => {
    const user = await userService.getUser(req.session.userId);
    res.json(UserView(user));
  })
);

app.get(
  "/api/v1/messages/:channelId",
  isLoggedIn,
  catchError(async (req, res) => {
    const { channelId } = req.params;
    const views = await messageService.getMessageViews(channelId);
    res.json(views);
  })
);

app.get(
  "/api/v1/channels",
  isLoggedIn,
  catchError(async (req, res) => {
    const channels = await channelService.getChannels();
    res.json(channels);
  })
);

app.post(
  "/api/v1/channels",
  isLoggedIn,
  catchError(async (req, res) => {
    const { name } = req.body;
    const channel = await channelService.createChannel(name);
    res.json(channel);
  })
);

app.use((req, res, next) => {
  res.status(404).end("404 not found");
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ error: error.message });
});

module.exports = server;
