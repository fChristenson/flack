const Component = require("../component");
const ChatListItem = require("./ChatListItem");
const createElement = require("../../lib/createElement");
const {
  SET_TYPING_USER,
  ADD_MESSAGE,
  ADD_INCOMING_MESSAGE
} = require("./chatEvents");
const { OpenActionbar } = require("../actionbar/actionbarActions");

const LINE_HEIGHT_IN_PIXELS = 14;
const TEXT_AREA_MAX_HEIGHT = 200;
const RETURN_KEY = 13;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("chat", this.onEvent);
    this.renderMessage = this.renderMessage.bind(this);
    this.openMoreActions = this.openMoreActions.bind(this);
    this.openThreadAction = this.openThreadAction.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
    this._createNewRow = this._createNewRow.bind(this);
  }

  postMessage(event) {
    event.preventDefault();

    if (event.keyCode === RETURN_KEY && !event.shiftKey) {
      this._sendMessage(event);
    } else if (event.keyCode === RETURN_KEY) {
      this._createNewRow();
    }

    const user = this.getStoreState().app.user.username;

    if (event.target.value.length < 1) {
      document.body.style.setProperty("--message-height", 0);
      window.socket.emit("stopped-typing", user);
    } else if (event.target.value.length > 0) {
      window.socket.emit("started-typing", user);
    }
  }

  _createNewRow() {
    const heightString = document.body.style.getPropertyValue(
      "--message-height"
    );
    const height = parseInt(heightString || 0);
    const newHeight = Math.min(
      TEXT_AREA_MAX_HEIGHT,
      height + LINE_HEIGHT_IN_PIXELS
    );
    document.body.style.setProperty("--message-height", newHeight);
  }

  _sendMessage(event) {
    const state = this.getStoreState();
    const message = {
      userId: state.app.user.id,
      channelId: state.sidebar.selectedChannel.id,
      text: event.target.value
    };
    socket.emit("message", message);
    event.target.value = "";
    document.body.style.setProperty("--message-height", 0);
  }

  openThreadAction(event) {
    event.preventDefault();
    const title = "Thread";
    const data = { title, component: createElement(window.thread) };
    this.dispatch(OpenActionbar(data));
  }

  openMoreActions(event, key) {
    event.preventDefault();
    alert(key);
  }

  renderMessage(message, index) {
    this.setChild(`item-${index}`, new ChatListItem({ message, key: index }));
    return `<template data-child="item-${index}"></template>`;
  }

  async onEvent(state, action) {
    if (action.type === ADD_MESSAGE || action.type === ADD_INCOMING_MESSAGE) {
      const index = state.chat.messages.length - 1;
      const message = state.chat.messages[index];
      const messageElement = new ChatListItem({ message, key: index });
      this.refs.messages.appendChild(createElement(messageElement));
    }

    if (action.type === ADD_MESSAGE) {
      this.refs.text.scrollTop = this.refs.text.scrollHeight;
    }

    if (action.type === SET_TYPING_USER) {
      const users = Object.keys(state.chat.typingUsers);
      const typingUsers = users.filter(user => !!state.chat.typingUsers[user]);

      if (typingUsers.length > 1) {
        this.refs.typing.textContent = "Several people are typing...";
      } else if (typingUsers.length === 1) {
        this.refs.typing.textContent = `${typingUsers[0]} is typing...`;
      } else {
        this.refs.typing.textContent = "";
      }
    }
  }

  render() {
    return `
      <div class="chat__container">
        <div data-ref="text" class="chat__text-container">
          <ul data-ref="messages">
            ${this.getStoreState()
      .chat.messages.map(this.renderMessage)
      .join("")}
          </ul>
          <div data-ref="typing" class="chat__typing"></div>
        </div>
        <div class="chat__input-container">
          <textarea onkeyup="chat.postMessage(event)" class="chat__input" placeholder="Message"></textarea>
        </div>
      </div>
    `;
  }
}

module.exports = Chat;
