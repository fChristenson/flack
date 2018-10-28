const Component = require("../../../component");

class MessageMenu extends Component {
  constructor(props) {
    super(props);
    this.renderElements = this.renderElements.bind(this);
  }

  renderElements() {
    return `
      <li onclick="chat.setEditMessage(event, '${this.props.messageId}')" class="chat__message-menu-li">Edit message</li>
      <li onclick="chat.deleteMessage(event, '${this.props.messageId}')" class="chat__message-menu-li--delete">Delete message</li>
    `;
  }

  render() {
    return `
      <div onclick="chat.closeMessageMenu(event, '${this.props.messageId}')" class="chat__message-container">
        <ul data-js="menu" class="chat__message-menu">
          ${this.props.renderElements ? this.renderElements() : ""}
        </ul>
      </div>
    `;
  }
}

module.exports = MessageMenu;
