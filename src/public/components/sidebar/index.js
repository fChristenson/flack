const createElement = require("../../lib/createElement");
const ChannelsList = require("./components/channelList/ChannelsList");
const DirectMessagesList = require("./components/directMessagesList/DirectMessagesList");
const AlertDirectMessageList = require("../alert/components/alertDirectMessageList/AlertDirectMessageList");
const AlertChannelList = require("../alert/components/alertChannelList/AlertChannelList");
const store = require("../../lib/store");
const { getUsersInChat } = require("../../lib/api/usersApi");
const { getAllChannels } = require("../../lib/api/channelsApi");
const { SetSelectedChannel } = require("./sidebarActions");
const { ShowAlert } = require("../alert/alertActions");
const Channel = require("../sidebar/Channel");
const createChannelButton = document.querySelector("[data-js=channels]");
const createDirectMessageButton = document.querySelector(
  "[data-js=direct-messages]"
);
const channelsList = document.querySelector("[data-js=channels-list]");
const directMessagesList = document.querySelector(
  "[data-js=direct-messages-list]"
);

createDirectMessageButton.addEventListener("click", async event => {
  const users = await getUsersInChat();
  const alertDirectMessageList = new AlertDirectMessageList({ users });
  window.alertDirectMessageList = alertDirectMessageList;
  store.dispatch(ShowAlert(createElement(window.alertDirectMessageList)));
});

createChannelButton.addEventListener("click", async event => {
  const incomingChannels = await getAllChannels();
  const channels = incomingChannels.map(incoming =>
    Channel(incoming, store.state.app.user)
  );
  const alertChannelList = new AlertChannelList({ channels });
  window.alertChannelList = alertChannelList;
  store.dispatch(ShowAlert(createElement(window.alertChannelList)));
});

const lastVisitedChannelId = store.state.app.user.lastVisitedChannelId;
const selectedChannel = store.state.sidebar.channels.find(
  channel => channel.id === lastVisitedChannelId
);

if (selectedChannel) {
  store.dispatch(SetSelectedChannel(selectedChannel));
}

window.channelsList = new ChannelsList();
const channelsNode = createElement(window.channelsList);

window.directMessagesList = new DirectMessagesList();
const directMessagesNode = createElement(window.directMessagesList);

channelsList.parentNode.replaceChild(channelsNode, channelsList);
directMessagesList.parentNode.replaceChild(
  directMessagesNode,
  directMessagesList
);
