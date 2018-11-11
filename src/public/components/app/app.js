const store = require("../../lib/store");
const { isLoggedIn } = require("../../lib/api/usersApi");
const appReducer = require("./appReducer");
const appInitState = require("./initState");
const { SetUser } = require("./appActions");
const sidebarReducer = require("../sidebar/sidebarReducer");
const sidebarInitState = require("../sidebar/initState");
const chatReducer = require("../chat/chatReducer");
const chatInitState = require("../chat/initState");
const User = require("./User");
const { SetChannels } = require("../sidebar/sidebarActions");
const Channel = require("../sidebar/Channel");
const { getChannels } = require("../../lib/api/channelsApi");
const socketIO = require("socket.io-client");

const socket = socketIO();
window.socket = socket;

(async () => {
  require("../snackbar");

  store.setReducer("app", appReducer, appInitState);
  store.setReducer("sidebar", sidebarReducer, sidebarInitState);
  store.setReducer("chat", chatReducer, chatInitState);

  const incomingUser = await isLoggedIn();
  const user = User(incomingUser);
  store.dispatch(SetUser(user));
  window.socket.emit("init", user.id);

  require("../alert");
  require("../sidebar");
  require("../header");
  require("../chat");
  require("../actionbar");
  require("./routes");
  require("./socketChannels");

  if (user.lastVisitedChannelId) {
    window.location.hash = `#/channels/${user.lastVisitedChannelId}`;
  } else {
    const incomingChannels = await getChannels();
    const channels = incomingChannels.map(incoming =>
      Channel(incoming, store.state.app.user)
    );
    store.dispatch(SetChannels(channels));
  }
})();
