const Component = require("../component");
const ChatMenu = require("./ChatMenu");

class ChatListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.setChild(
      `menu-${this.props.key}`,
      new ChatMenu({ key: this.props.key })
    );
    return `
      <li class="chat__li">
        <div>
          <div class="chat__img"></div>
        </div>
        <div>
          <div>
            <span class="chat__username">${this.props.message.username}</span>
            <span class="chat__date">${this.props.message.createdAt}</span>
          </div>
          <div class="chat__text">${this.props.message.text}</div>
        </div>
        <template data-child="menu-${this.props.key}"></template>
      </li>
    `;
  }
}

module.exports = ChatListItem;
