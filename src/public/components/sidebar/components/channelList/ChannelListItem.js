const Component = require("../../../component");

class ChannelListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return `
    <li data-channel="${this.props.channel.id}" class="sidebar__li">
      <a href="#/channels/${this.props.channel.id}" class="sidebar__link">
        <span class="sidebar__hash">#</span> ${this.props.channel.name}
      </a>
    </li>
  `;
  }
}

module.exports = ChannelListItem;
