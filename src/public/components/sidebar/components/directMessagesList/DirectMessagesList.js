const Component = require("../../../component");
const {
  SET_SELECTED_CHANNEL,
  SET_CHANNELS,
  ADD_CHANNEL
} = require("../../sidebarEvents");
const createElement = require("../../../../lib/createElement");
const DirectMessagesListItem = require("./DirectMessageListItem");

class DirectMessagesList extends Component {
  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.removeChannel = this.removeChannel.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("directMessagesList", this.onEvent);
  }

  onEvent(state, action) {
    const includes = [SET_SELECTED_CHANNEL, SET_CHANNELS];

    if (includes.includes(action.type)) {
      Array.from(this.refs.list.childNodes).forEach(ref => {
        ref.classList.remove("sidebar__li");
        ref.classList.remove("sidebar__li--selected");
        ref.classList.add("sidebar__li");
      });
    }

    if (action.type === SET_SELECTED_CHANNEL) {
      const element = Array.from(this.refs.list.childNodes).find(
        element => element.getAttribute("data-channel") === action.value.id
      );

      if (element) {
        element.classList.add("sidebar__li--selected");
      }
    }

    const listLen = this.refs.list.childNodes.length;
    const channelLen = state.sidebar.channels.length;
    const channelWasAdded = channelLen > listLen;

    if (action.type === ADD_CHANNEL && channelWasAdded) {
      const child = createElement(
        new DirectMessagesListItem({ channel: action.value })
      );
      this.refs.list.appendChild(child);
    }

    if (action.type === SET_CHANNELS) {
      Array.from(this.refs.list.childNodes).forEach(node => node.remove());
      state.sidebar.channels.forEach(channel => {
        const child = createElement(new DirectMessagesListItem({ channel }));
        this.refs.list.appendChild(child);
      });
    }
  }

  removeChannel(event, channelName) {
    event.preventDefault();
    alert(`Remove ${channelName}`);
  }

  renderListItem(channel, index) {
    this.setChild(`item-${index}`, new DirectMessagesListItem({ channel }));
    return `<template data-child="item-${index}"></template>`;
  }

  render() {
    return `
      <ul data-ref="list" class="sidebar__list">${this.getStoreState()
      .sidebar.channels.filter(channel => channel.type === "directMessage")
      .map(this.renderListItem)
      .join("")}</ul>
    `;
  }
}

module.exports = DirectMessagesList;
