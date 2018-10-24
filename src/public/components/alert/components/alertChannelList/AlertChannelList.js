const Component = require("../../../component");
const ChannelListItem = require("./ChannelListItem");
const { FilterChannels, CloseAlert } = require("../../alertActions");
const { FILTER_CHANNELS } = require("../../alertEvents");

class AlertChannelList extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.filterChannels = this.filterChannels.bind(this);
    this.setSubscriber("alertChannelList", this.onEvent);
    this.renderChannel = this.renderChannel.bind(this);
    this.openChannel = this.openChannel.bind(this);
  }

  filterChannels(event) {
    event.preventDefault();
    const text = event.target.value;
    this.dispatch(FilterChannels(text));
  }

  async openChannel(event, channelId) {
    event.preventDefault();
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
        <div class="alert__channel-header">
          <h1>Browse Channels</h1>
          <button class="alert__create-channel">Create channel</button>
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
    `;
  }
}

module.exports = AlertChannelList;
