const router = require("../../lib/router");
const store = require("../../lib/store");
const { getMessages } = require("../../lib/api/chatApi");
const {
  setLastVisitedChannel,
  getChannels
} = require("../../lib/api/channelsApi");
const { setUnreadMessages } = require("../../lib/api/usersApi");
const {
  SetMessages,
  ResetTypingUsers,
  ScrollToBottom
} = require("../chat/chatActions");
const Channel = require("../sidebar/Channel");
const Message = require("../chat/Message");
const User = require("../app/User");
const { SetUser } = require("../app/appActions");
const {
  SetSelectedChannel,
  SetChannels
} = require("../sidebar/sidebarActions");

router.add("/channels/:channelId", async params => {
  window.socket.emit("init", store.state.app.user.id);
  store.dispatch(ResetTypingUsers());
  const { channelId } = params;
  const incomingChannels = await getChannels();
  const channels = incomingChannels.map(incoming =>
    Channel(incoming, store.state.app.user)
  );
  store.dispatch(SetChannels(channels));
  const channel = channels.find(channel => channel.id === channelId);
  store.dispatch(SetSelectedChannel(channel));
  setLastVisitedChannel(channelId);

  const messages = await getMessages(channelId);
  store.dispatch(SetMessages(messages.map(incoming => new Message(incoming))));
  store.dispatch(ScrollToBottom());
  const incomingUser = await setUnreadMessages(channelId, 0);
  const user = User(incomingUser);
  store.dispatch(SetUser(user));
});

router.listen();
