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
    const channel = this.getStoreState().sidebar.channels.find(
      channel => channel.name === channelName
    );
    this.dispatch(SetSelectedChannel(channel));
    this.refs[channelName].classList.add("sidebar__li--selected");
  }

  renderListItem({ selected, name }) {
    const className = selected ? "sidebar__li--selected" : "sidebar__li";
    return `
      <li data-ref="${name}" class="${className}">
        <a onclick="channelsList.loadChannel(event, '${name}')" class="sidebar__link">
          <span class="sidebar__hash">#</span> ${name}
        </a>
      </li>
    `;
  }

  render() {
    return `
      <ul class="sidebar__list">
        ${this.getStoreState()
      .sidebar.channels.map(this.renderListItem)
      .join("")}
      </ul>
    `;
  }
}

module.exports = ChannelList;
