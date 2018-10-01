const createElement = require("../../lib/createElement");
const ChannelsList = require("./ChannelsList");
const DirectMessagesList = require("./DirectMessagesList");
const store = require("../../lib/store");
const { SetChannels, SetSelectedChannel } = require("./sidebarActions");
const { getChannels } = require("../../lib/api/channelsApi");

(async () => {
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

  const channels = await getChannels();
  store.dispatch(SetChannels(channels));
  const lastVisitedChannel = store.state.app.user.lastVisitedChannel;
  const selectedChannel = channels.find(
    channel => channel.name === lastVisitedChannel
  );
  store.dispatch(SetSelectedChannel(selectedChannel));

  window.channelsList = new ChannelsList();
  const channelsNode = createElement(window.channelsList);

  const directMessages = [];
  window.directMessagesList = new DirectMessagesList({ directMessages });
  const directMessagesNode = createElement(window.directMessagesList);

  channelsList.parentNode.replaceChild(channelsNode, channelsList);
  directMessagesList.parentNode.replaceChild(
    directMessagesNode,
    directMessagesList
  );
})();
