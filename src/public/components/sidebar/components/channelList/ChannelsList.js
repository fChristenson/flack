const Component = require("../../../component");
const { SET_SELECTED_CHANNEL, SET_CHANNELS } = require("../../sidebarEvents");
const createElement = require("../../../../lib/createElement");
const ChannelListItem = require("./ChannelListItem");

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("channelList", this.onEvent);
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

    if (action.type === SET_CHANNELS) {
      Array.from(this.refs.list.childNodes).forEach(node => node.remove());
      state.sidebar.channels
        .filter(channel => channel.type === "channel")
        .forEach(channel => {
          const child = createElement(new ChannelListItem({ channel }));
          this.refs.list.appendChild(child);
        });
    }
  }

  renderListItem(channel, index) {
    this.setChild(`item-${index}`, new ChannelListItem({ channel }));
    return `<template data-child="item-${index}"></template>`;
  }

  render() {
    return `<ul data-ref="list" class="sidebar__list">${this.getStoreState()
      .sidebar.channels.filter(channel => channel.type === "channel")
      .map(this.renderListItem)
      .join("")}</ul>`;
  }
}

module.exports = ChannelList;
