const Component = require("../../../component");
const { SET_SELECTED_CHANNEL } = require("../../sidebarEvents");
const ChannelListItem = require("./ChannelListItem");

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.renderListItem = this.renderListItem.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("channelList", this.onEvent);
  }

  onEvent(state, action) {
    if (action.type === SET_SELECTED_CHANNEL) {
      Array.from(this.refs.list.childNodes).forEach(ref => {
        ref.classList.remove("sidebar__li");
        ref.classList.remove("sidebar__li--selected");
        ref.classList.add("sidebar__li");
      });

      const element = Array.from(this.refs.list.childNodes).find(
        element => element.getAttribute("data-channel") === action.value.id
      );

      if (element) {
        element.classList.add("sidebar__li--selected");
      }
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
