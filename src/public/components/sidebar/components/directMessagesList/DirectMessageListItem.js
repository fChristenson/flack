const Component = require("../../../component");
const { SET_USER } = require("../../../app/appEvents");

class DirectMessagesList extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber(
      `directMessageListItem-${this.props.channel.id}`,
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
        this.refs.times.style.display = "none";
      } else {
        this.refs.unreadMessages.style.display = "none";
        this.refs.times.style.display = "initial";
      }
    }
  }

  onCreated() {
    const count = this.getStoreState().app.user.unreadMessages[
      this.props.channel.id
    ];

    if (!count) {
      this.refs.unreadMessages.style.display = "none";
    } else {
      this.refs.times.style.display = "none";
    }
  }

  render() {
    const count = this.getStoreState().app.user.unreadMessages[
      this.props.channel.id
    ];

    if (count >= 99) count = "99+";

    return `
      <li class="sidebar__li" data-channel="${this.props.channel.id}">
        <a href="#/channels/${this.props.channel.id}" class="sidebar__direct-message-link">
          <span>
            <span>
              <span class="sidebar__dot"></span>
              ${this.props.channel.name}
            </span>
          </span>
          <span data-ref="unreadMessages" class="sidebar__unread">${count}</span>
          <button data-ref="times" onclick="directMessagesList.leaveChannel(event, '${this.props.channel.id}')" class="sidebar__times">&times;</button>
        </a>
      </li>
    `;
  }
}

module.exports = DirectMessagesList;
