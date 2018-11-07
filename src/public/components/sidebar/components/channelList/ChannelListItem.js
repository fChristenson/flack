const Component = require("../../../component");
const { SET_USER } = require("../../../app/appEvents");

class ChannelListItem extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber(
      `channelListItem-${this.props.channel.id}`,
      this.onEvent
    );
  }

  onEvent(state, action) {
    if (action.type === SET_USER) {
      const count = action.value.unreadMessages[this.props.channel.id];

      if (count >= 99) {
        this.refs.unreadMessages.textContent = "99+";
      } else {
        this.refs.unreadMessages.textContent = count;
      }

      if (count > 0) {
        this.refs.unreadMessages.style.display = "inline";
      } else {
        this.refs.unreadMessages.style.display = "none";
      }
    }
  }

  onCreated() {
    const count = this.getStoreState().app.user.unreadMessages[
      this.props.channel.id
    ];

    if (!count) {
      this.refs.unreadMessages.style.display = "none";
    }
  }

  render() {
    const count = this.getStoreState().app.user.unreadMessages[
      this.props.channel.id
    ];

    if (count >= 99) count = "99+";

    return `
    <li data-channel="${this.props.channel.id}" class="sidebar__li">
      <a href="#/channels/${this.props.channel.id}" class="sidebar__link">
        <span>
          <span class="sidebar__hash">#</span>
          ${this.props.channel.name}
        </span>
        <span data-ref="unreadMessages" class="sidebar__unread">${count}</span>
      </a>
    </li>
  `;
  }
}

module.exports = ChannelListItem;
