const Component = require("../component");
const { SetSelectedChannel } = require("./sidebarActions");
const { SET_SELECTED_CHANNEL } = require("./sidebarEvents");

class ChannelList extends Component {
  constructor(props) {
    super(props);
    this.loadChannel = this.loadChannel.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("channelList", this.onEvent);
  }

  onEvent(state, action) {
    if (action.type === SET_SELECTED_CHANNEL) {
      const refs = Object.values(this.refs);

      refs.forEach(ref => {
        ref.classList.remove("sidebar__li");
        ref.classList.remove("sidebar__li--selected");
        ref.classList.add("sidebar__li");
      });
    }
  }

  loadChannel(event, channelName) {
    event.preventDefault();
    this.dispatch(SetSelectedChannel(channelName));
    this.refs[channelName].classList.add("sidebar__li--selected");
  }

  renderListItem({ selected, channelName }, index) {
    const className = selected ? "sidebar__li--selected" : "sidebar__li";
    return `
      <li data-ref="${channelName}" class="${className}">
        <a onclick="channelsList.loadChannel(event, '${channelName}')" class="sidebar__link">
          <span class="sidebar__hash">#</span> ${channelName}
        </a>
      </li>
    `;
  }

  render() {
    return `
      <ul class="sidebar__list">
        ${this.props.channels.map(this.renderListItem).join("")}
      </ul>
    `;
  }
}

module.exports = ChannelList;
