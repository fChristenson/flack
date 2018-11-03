const Component = require("../component");
const ChatMenu = require("./ChatMenu");
const EditText = require("./components/editText/EditText");
const ReplySection = require("./ReplySection");
const Message = require("./Message");
const { updateMessage } = require("../../lib/api/chatApi");
const { SetUpdateMessage, StopEditMessage } = require("./chatActions");
const {
  SetTextAreaHeight,
  ResetTextAreaHeight
} = require("../messageTextArea/messageTextAreaActions");
const {
  EDIT_MESSAGE,
  STOP_EDIT_MESSAGE,
  UPDATE_MESSAGE
} = require("./chatEvents");

class ChatListItem extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber(`chatListItem-${props.message.id}`, this.onEvent);
    this._showEdit = this._showEdit.bind(this);
    this._hideEdit = this._hideEdit.bind(this);
  }

  async onEvent(state, action) {
    if (
      action.type === UPDATE_MESSAGE && action.value === this.props.message.id
    ) {
      const textarea = this.refs.content.querySelector(
        `[data-js=edit-text-area]`
      );
      const incomingMessage = await updateMessage(
        this.props.message.id,
        textarea.value
      );
      const message = new Message(incomingMessage);
      this.dispatch(SetUpdateMessage(message));
      window.socket.emit("update-message", message.id);
      this.dispatch(ResetTextAreaHeight("edit-text"));
      this.dispatch(StopEditMessage(message.id));
      this.refs.textContent.innerHTML = message.text;
    }

    if (
      action.type === EDIT_MESSAGE && action.value === this.props.message.id
    ) {
      this._showEdit();
      const message = state.chat.messages.find(message => {
        return message.id === this.props.message.id;
      });
      const text = message.text.replace(/<br\/>/g, "\n");
      const height = text.split("").filter(item => item === "\n").length;
      this.dispatch(SetTextAreaHeight({ textAreaName: "edit-text", height }));
      const textarea = this.refs.content.querySelector(
        `[data-js=edit-text-area]`
      );
      textarea.value = text;
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }

    if (
      action.type === STOP_EDIT_MESSAGE &&
      action.value === this.props.message.id
    ) {
      this.dispatch(ResetTextAreaHeight("edit-text"));
      this._hideEdit();
      const message = state.chat.messages.find(message => {
        return message.id === this.props.message.id;
      });
      this.refs.textContent.innerHTML = message.text;
    }
  }

  _showEdit() {
    const editText = this.refs.content.querySelector(`[data-js=edit-text]`);
    editText.style.display = "initial";

    const reply = this.refs.content.querySelector(`[data-js=reply]`);
    reply.style.display = "none";

    this.refs.textContent.style.display = "none";
  }

  _hideEdit() {
    const editText = this.refs.content.querySelector(`[data-js=edit-text]`);
    editText.style.display = "none";

    if (this.props.message.replyMessages.length > 0) {
      const reply = this.refs.content.querySelector(`[data-js=reply]`);
      reply.style.display = "flex";
    }

    this.refs.textContent.style.display = "block";
  }

  render() {
    this.setChild(
      `menu-${this.props.message.id}`,
      new ChatMenu({ messageId: this.props.message.id })
    );
    this.setChild(
      `edit-text-${this.props.message.id}`,
      new EditText({ text: "", messageId: this.props.message.id })
    );
    this.setChild(
      `reply-${this.props.message.id}`,
      new ReplySection({ message: this.props.message })
    );
    return `
      <li data-message="${this.props.message.id}" class="chat__li">
        <div>
          <div class="chat__img"></div>
        </div>
        <div data-ref="content" class="chat__li-content">
          <div>
            <span class="chat__username">${this.props.message.username}</span>
            <span class="chat__date">${this.props.message.createdAt}</span>
          </div>
          <div data-ref="textContent" class="chat__text">${this.props.message.text}</div>
          <template data-child="edit-text-${this.props.message.id}"></template>
          <template data-child="reply-${this.props.message.id}"></template>
        </div>
        <template data-child="menu-${this.props.message.id}"></template>
      </li>
    `;
  }
}

module.exports = ChatListItem;
