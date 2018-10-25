const Component = require("../../../component");

class DirectMessagesList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <li class="sidebar__li" data-channel="${this.props.channel.id}">
        <a href="#/channels/${this.props.channel.id}" class="sidebar__direct-message-link">
          <span>
            <span class="sidebar__dot"></span>
            ${this.props.channel.name}
          </span>
          <button onclick="directMessagesList.leaveChannel(event, '${this.props.channel.id}')" class="sidebar__times">&times;</button>
        </a>
      </li>
    `;
  }
}

module.exports = DirectMessagesList;
