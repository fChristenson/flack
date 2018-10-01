const store = require("../lib/store");
const sidebarReducer = require("./sidebar/sidebarReducer");
const sidebarInitState = require("./sidebar/initState");
const chatReducer = require("./chat/chatReducer");
const chatInitState = require("./chat/initState");
const { SetTypingUser } = require("./chat/chatActions");
const socketIO = require("socket.io-client");
const socket = socketIO();

window.socket = socket;

store.setReducer("sidebar", sidebarReducer, sidebarInitState);
store.setReducer("chat", chatReducer, chatInitState);

require("./sidebar");
require("./header");
require("./chat");
require("./actionbar");

window.socket.on("started-typing", user => {
  store.dispatch(SetTypingUser({ user, isTyping: true }));
});

window.socket.on("stopped-typing", user => {
  store.dispatch(SetTypingUser({ user, isTyping: false }));
});

window.socket.on("message", message => {
  console.log(message);
  console.log("--------------------------");
});
