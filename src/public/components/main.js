const store = require("../lib/store");
const { isLoggedIn } = require("../lib/api/usersApi");
const appReducer = require("./appReducer");
const appInitState = require("./initState");
const { SetUser } = require("./appActions");
const sidebarReducer = require("./sidebar/sidebarReducer");
const sidebarInitState = require("./sidebar/initState");
const Channel = require("./sidebar/Channel");
const chatReducer = require("./chat/chatReducer");
const chatInitState = require("./chat/initState");
const User = require("./User");
const { getChannels } = require("../lib/api/channelsApi");
const { SetChannels } = require("./sidebar/sidebarActions");
const { SetTypingUser } = require("./chat/chatActions");
const {
  SetMessages,
  AddIncomingMessage,
  AddMessage
} = require("./chat/chatActions");
const { getMessages } = require("../lib/api/chatApi");
const Message = require("./chat/Message");
const socketIO = require("socket.io-client");
const socket = socketIO();

(async () => {
  store.setReducer("app", appReducer, appInitState);
  store.setReducer("sidebar", sidebarReducer, sidebarInitState);
  store.setReducer("chat", chatReducer, chatInitState);

  const [incomingUser, incomingChannels] = await Promise.all([
    isLoggedIn(),
    getChannels()
  ]);
  const user = User(incomingUser);
  const channels = incomingChannels.map(Channel);
  const selectedChannel = channels.find(
    channel => channel.name === user.lastVisitedChannel
  );
  const messages = await getMessages(selectedChannel.id);
  store.dispatch(SetUser(user));
  store.dispatch(SetChannels(channels));
  store.dispatch(SetMessages(messages.map(Message)));
  window.socket = socket;

  require("./alert");
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

  window.socket.on("my-message", message => {
    store.dispatch(AddMessage(Message(message)));
  });

  window.socket.on("message", message => {
    store.dispatch(AddIncomingMessage(Message(message)));
  });
})();
