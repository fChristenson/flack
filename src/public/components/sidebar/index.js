const createElement = require("../../lib/createElement");
const ChannelsList = require("./ChannelsList");
const DirectMessagesList = require("./DirectMessagesList");
const sidebarReducer = require("./sidebarReducer");
const initState = require("./initState");
const store = require("../../lib/store");

const createChannelButton = document.querySelector("[data-js=channels]");
const createDirectMessageButton = document.querySelector(
  "[data-js=direct-messages]"
);
const channelsList = document.querySelector("[data-js=channels-list]");
const directMessagesList = document.querySelector(
  "[data-js=direct-messages-list]"
);

createDirectMessageButton.addEventListener("click", event => {
  alert("Show create direct message modal");
});

createChannelButton.addEventListener("click", event => {
  alert("Show create channel modal");
});

const channels = [{ channelName: "general" }, { channelName: "foo" }];
window.channelsList = new ChannelsList({ channels });
const channelsNode = createElement(window.channelsList);

const directMessages = [{ channelName: "general" }, { channelName: "foo" }];
window.directMessagesList = new DirectMessagesList({ directMessages });
const directMessagesNode = createElement(window.directMessagesList);

channelsList.parentNode.replaceChild(channelsNode, channelsList);
directMessagesList.parentNode.replaceChild(
  directMessagesNode,
  directMessagesList
);

store.setReducer("sidebar", sidebarReducer, initState);
