const Component = require("../../../component");

class ChannelListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
      <li onclick="alertChannelList.openChannel(event, '${this.props.channel.id}')" data-channel="${this.props.channel.name}" class="alert__user-list-item">
        <span class="alert__user-list-item-name"><span class="alert__channel-hash">#</span> ${this.props.channel.name}</span>
      </li>
    `;
  }
}

module.exports = ChannelListItem;
