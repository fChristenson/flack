const createElement = require("../../lib/createElement");
const ChannelsList = require("./components/channelList/ChannelsList");
const DirectMessagesList = require("./components/directMessagesList/DirectMessagesList");
const AlertDirectMessageList = require("../alert/components/alertDirectMessageList/AlertDirectMessageList");
const store = require("../../lib/store");
const { getUsersInChat } = require("../../lib/api/usersApi");
const { SetSelectedChannel } = require("./sidebarActions");
const { ShowAlert } = require("../alert/alertActions");
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
  const title = "Direct Messages";
  const alertDirectMessageList = new AlertDirectMessageList({ users });
  window.alertDirectMessageList = alertDirectMessageList;
  const data = {
    title,
    component: createElement(window.alertDirectMessageList)
  };
  store.dispatch(ShowAlert(data));
});

createChannelButton.addEventListener("click", event => {
  alert("Show create channel modal");
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
