const { SetTypingUser } = require("../chat/chatActions");
const User = require("../app/User");
const { SetUser } = require("../app/appActions");
const {
  AddIncomingMessage,
  IncomingUpdateMessage,
  AddMessage,
  IncomingDeleteMessage
} = require("../chat/chatActions");
const {
  AddReply,
  AddIncomingReply
} = require("../actionbar/components/thread/threadActions");
const { getChannel } = require("../../lib/api/channelsApi");
const { setUnreadMessages } = require("../../lib/api/usersApi");
const store = require("../../lib/store");
const Message = require("../chat/Message");
const Reply = require("../actionbar/components/thread/Reply");
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
  store.dispatch(AddMessage(new Message(message)));
});

window.socket.on("my-reply", reply => {
  store.dispatch(AddReply(new Reply(reply)));
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
  const message = new Message(incomingMessage);
  if (store.state.sidebar.selectedChannel.id === message.channelId) {
    store.dispatch(AddIncomingMessage(message));
  } else {
    const count = store.state.app.user.unreadMessages[message.channelId];
    let incomingUser;

    if (count === undefined) {
      incomingUser = await setUnreadMessages(message.channelId, 1);
    } else {
      incomingUser = await setUnreadMessages(message.channelId, count + 1);
    }

    const user = User(incomingUser);
    store.dispatch(SetUser(user));
  }
});

window.socket.on("reply", incomingReply => {
  const reply = new Reply(incomingReply);
  if (store.state.sidebar.selectedChannel.id === reply.channelId) {
    store.dispatch(AddIncomingReply(reply));
  }
});

window.socket.on("update-message", incomingMessage => {
  const message = new Message(incomingMessage);
  if (store.state.sidebar.selectedChannel.id === message.channelId) {
    store.dispatch(IncomingUpdateMessage(message));
  }
});

window.socket.on("delete-message", messageId => {
  store.dispatch(IncomingDeleteMessage(messageId));
});
