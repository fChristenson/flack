const { SetTypingUser } = require("../chat/chatActions");
const { AddIncomingMessage, AddMessage } = require("../chat/chatActions");
const { getChannel } = require("../../lib/api/channelsApi");
const store = require("../../lib/store");
const Message = require("../chat/Message");
const Channel = require("../sidebar/Channel");
const { AddChannel } = require("../sidebar/sidebarActions");

window.socket.on("started-typing", message => {
  const { user, channelId } = message;
  if (store.state.sidebar.selectedChannel.id === channelId) {
    store.dispatch(SetTypingUser({ user, isTyping: true }));
  }
});

window.socket.on("stopped-typing", message => {
  const { user, channelId } = message;
  if (store.state.sidebar.selectedChannel.id === channelId) {
    store.dispatch(SetTypingUser({ user, isTyping: false }));
  }
});

window.socket.on("my-message", message => {
  store.dispatch(AddMessage(Message(message)));
});

window.socket.on("first-direct-message", async channelId => {
  const hasChannel = store.state.sidebar.channels.find(
    channel => channel.id === channelId
  );

  if (hasChannel) return;
  const incomingChannel = await getChannel(channelId);
  const channel = Channel(incomingChannel, store.state.app.user);
  store.dispatch(AddChannel(channel));
  window.socket.emit("init", store.state.app.user.id);
});

window.socket.on("message", async incomingMessage => {
  const message = Message(incomingMessage);
  if (store.state.sidebar.selectedChannel.id === message.channelId) {
    store.dispatch(AddIncomingMessage(message));
  }
});
