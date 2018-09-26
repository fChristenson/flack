const Component = require("../component");
const { SET_SELECTED_CHANNEL } = require("./sidebarEvents");
const { SetSelectedChannel } = require("./sidebarActions");

class DirectMessagesList extends Component {
  constructor(props) {
    super(props);
    this.loadDirectMessages = this.loadDirectMessages.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.removeChannel = this.removeChannel.bind(this);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("directMessagesList", this.onEvent);
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

  removeChannel(event, channelName) {
    event.preventDefault();
    alert(`Remove ${channelName}`);
  }

  loadDirectMessages(event, channelName) {
    event.preventDefault();
    this.dispatch(SetSelectedChannel(channelName));
    this.refs[channelName].classList.add("sidebar__li--selected");
  }

  renderListItem({ selected, channelName }) {
    return `
      <li data-ref="${channelName}" class="sidebar__li">
        <a onclick="directMessagesList.loadDirectMessages(event, '${channelName}')" class="sidebar__direct-message-link">
          <span>
            <span class="sidebar__dot"></span>
            ${channelName}
          </span>
          <button onclick="directMessagesList.removeChannel(event, '${channelName}')" class="sidebar__times">&times;</button>
        </a>
      </li>
    `;
  }

  render() {
    return `
      <ul class="sidebar__list">
        ${this.props.directMessages.map(this.renderListItem).join("")}
      </ul>
    `;
  }
}

module.exports = DirectMessagesList;
