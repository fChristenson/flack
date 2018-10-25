const Component = require("../../../component");
const ChannelListItem = require("./ChannelListItem");
const {
  FilterChannels,
  ShowCreateChannel,
  CloseAlert
} = require("../../alertActions");
const Channel = require("../../../sidebar/Channel");
const { getChannel, joinChannel } = require("../../../../lib/api/channelsApi");
const createElement = require("../../../../lib/createElement");
const { FILTER_CHANNELS } = require("../../alertEvents");
const CreateChannel = require("./components/createChannel/CreateChannel");
require("./components/createChannel");

class AlertChannelList extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.filterChannels = this.filterChannels.bind(this);
    this.setSubscriber("alertChannelList", this.onEvent);
    this.renderChannel = this.renderChannel.bind(this);
    this.openChannel = this.openChannel.bind(this);
    this.createChannel = this.createChannel.bind(this);
  }

  createChannel(event) {
    event.preventDefault();
    window.createChannel = new CreateChannel();
    const node = createElement(window.createChannel);
    this.dispatch(ShowCreateChannel(node));
  }

  filterChannels(event) {
    event.preventDefault();
    const text = event.target.value;
    this.dispatch(FilterChannels(text));
  }

  async openChannel(event, channelId) {
    event.preventDefault();
    const incomingChannel = await getChannel(channelId);
    const user = this.getStoreState().app.user;
    const channel = Channel(incomingChannel, user);
    const isInChannel = channel.usersInChannel.find(
      userId => user.id === userId
    );

    if (!isInChannel) {
      await joinChannel(channelId);
    }

    this.dispatch(CloseAlert());
    window.location.hash = `#/channels/${channelId}`;
  }

  onEvent(state, action) {
    if (action.type === FILTER_CHANNELS) {
      const items = Object.values(this.refs.channelList.childNodes);
      const regex = new RegExp(`^${action.value}`);

      items.forEach(element => {
        element.classList.remove("alert__li--hide");
        if (!regex.test(element.getAttribute("data-channel"))) {
          element.classList.add("alert__li--hide");
        }
      });
    }
  }

  renderChannel(channel, index) {
    this.setChild(`item-${index}`, new ChannelListItem({ channel }));
    return `<template data-child="item-${index}"></template>`;
  }

  render() {
    return `
      <div>
        <header class="alert__header">
          <button class="alert__button" onclick="alertModal.close()">
            <div class="alert__times">&times;</div>
            esc
          </button>
        </header>
        <div class="alert__content-container">
            <div class="alert__channel-header">
            <h1>Browse Channels</h1>
            <button class="alert__create-channel" onclick="alertChannelList.createChannel(event)">Create channel</button>
          </div>
          <div class="alert__direct-message-list">
            <form class="alert__direct-message-form">
              <input onkeyup="alertChannelList.filterChannels(event)" class="alert__find-conversation" type="text" placeholder="Search channel" />
            </form>
            <ul data-ref="channelList" class="alert__direct-message-ul">${this.props.channels
      .map(this.renderChannel)
      .join("")}</ul>
          </div>
        </div>
      </div>
    `;
  }
}

module.exports = AlertChannelList;
