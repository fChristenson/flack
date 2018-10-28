const Component = require("../component");
const ChatListItem = require("./ChatListItem");
const createElement = require("../../lib/createElement");
const {
  SET_TYPING_USER,
  RESET_TYPING_USERS,
  ADD_MESSAGE,
  SCROLL_TO_BOTTOM,
  INCOMING_UPDATE_MESSAGE,
  SET_MESSAGES,
  ADD_INCOMING_MESSAGE
} = require("./chatEvents");
const { updateMessage } = require("../../lib/api/chatApi");
const EditText = require("./components/editText/EditText");
const MessageMenu = require("./components/messageMenu/MessageMenu");
const Message = require("./Message");
const Thread = require("../actionbar/components/thread/Thread");
const { UpdateMessage } = require("./chatActions");
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
    this.editMessage = this.editMessage.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
    this.closeMessageMenu = this.closeMessageMenu.bind(this);
    this.setEditMessage = this.setEditMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this._createNewRow = this._createNewRow.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveUpdatedMessage = this.saveUpdatedMessage.bind(this);
  }

  async saveUpdatedMessage(event) {
    event.preventDefault();
    const element = this.refs.messages.querySelector(
      `[data-js=edit-text-area]`
    );
    const messageId = this.getStoreState().chat.messages[this.state.key].id;
    const incomingMessage = await updateMessage(messageId, element.value);
    const message = Message(incomingMessage);
    this.dispatch(UpdateMessage(message));
    window.socket.emit("update-message", message.id);
    this.cancelEdit(event);
  }

  cancelEdit(event) {
    event.preventDefault();
    const element = this.refs.messages.querySelector(`[data-js=edit-text]`);
    const message = this.getStoreState().chat.messages[this.state.key];
    const component = new ChatListItem({
      message,
      key: this.state.key
    });
    const node = createElement(component);
    const textElement = node.querySelector(`[data-js=text-${this.state.key}]`);
    element.parentNode.replaceChild(textElement, element);
    document.body.style.setProperty("--edit-message-height", 0);
  }

  setEditMessage(event) {
    event.preventDefault();
    const element = this.refs.messages.querySelector(
      `[data-js=text-${this.state.key}]`
    );
    const item = this.getStoreState().chat.messages[this.state.key];
    const text = item.text.replace(/<br\/>/g, "\n");
    text.split("").filter(item => item === "\n").forEach(() => {
      this._createNewRow("--edit-message-height");
    });
    const node = createElement(new EditText({ text }));
    element.parentNode.replaceChild(node, element);
    const textarea = node.querySelector(`[data-js=edit-text-area]`);
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  async editMessage(event) {
    event.preventDefault();
    if (event.keyCode === RETURN_KEY && !event.shiftKey) {
      await this.saveUpdatedMessage(event);
    } else if (event.keyCode === RETURN_KEY) {
      this._createNewRow("--edit-message-height");
    }

    if (event.target.value.length < 1) {
      document.body.style.setProperty("--edit-message-height", 0);
    }
  }

  deleteMessage(event) {
    event.preventDefault();
    alert("deleteMessage");
  }

  postMessage(event) {
    event.preventDefault();
    if (event.keyCode === RETURN_KEY && !event.shiftKey) {
      this._sendMessage(event, "message", "--message-height");
    } else if (event.keyCode === RETURN_KEY) {
      this._createNewRow("--message-height");
    }

    const user = this.getStoreState().app.user.username;
    const channelId = this.getStoreState().sidebar.selectedChannel.id;

    if (event.target.value.length < 1) {
      document.body.style.setProperty("--message-height", 0);
      window.socket.emit("stopped-typing", { channelId, user });
    } else if (event.target.value.length > 0) {
      window.socket.emit("started-typing", { channelId, user });
    }
  }

  _createNewRow(varname) {
    const heightString = document.body.style.getPropertyValue(varname);
    const height = parseInt(heightString || 0);
    const newHeight = Math.min(
      TEXT_AREA_MAX_HEIGHT,
      height + LINE_HEIGHT_IN_PIXELS
    );
    document.body.style.setProperty(varname, newHeight);
  }

  _sendMessage(event, eventName, varname) {
    const state = this.getStoreState();
    const message = {
      userId: state.app.user.id,
      channelId: state.sidebar.selectedChannel.id,
      text: event.target.value
    };
    window.socket.emit(eventName, message);
    event.target.value = "";
    document.body.style.setProperty(varname, 0);
  }

  openThreadAction(event) {
    event.preventDefault();
    const title = "Thread";
    window.thread = new Thread();
    const data = { title, component: createElement(window.thread) };
    this.dispatch(OpenActionbar(data));
  }

  closeMessageMenu(event) {
    event.preventDefault();
    this.state.messageMenu.remove();
  }

  openMoreActions(event, key) {
    event.preventDefault();
    const targetDimensions = event.target.getBoundingClientRect();
    const targetX = targetDimensions.x;
    const targetY = targetDimensions.y;
    const username = this.getStoreState().chat.messages[key].username;
    const renderElements = username === this.getStoreState().app.user.username;
    const component = new MessageMenu({ renderElements });
    const node = createElement(component);
    this.state.messageMenu = node;
    this.state.key = key;
    document.body.appendChild(this.state.messageMenu);
    const menu = this.state.messageMenu.querySelector("[data-js=menu]");
    const menuDimensions = menu.getBoundingClientRect();
    const menuX = targetX - menuDimensions.width;
    const menuY = targetY;
    menu.style.top = `${menuY}px`;
    menu.style.left = `${menuX}px`;
  }

  renderMessage(message, index) {
    this.setChild(`${index}`, new ChatListItem({ message, key: index }));
    return `<template data-child="${index}"></template>`;
  }

  async onEvent(state, action) {
    if (action.type === SET_MESSAGES) {
      Array.from(this.refs.messages.childNodes).forEach(el => el.remove());
      state.chat.messages.forEach((message, index) => {
        const messageElement = new ChatListItem({ message, key: index });
        this.refs.messages.appendChild(createElement(messageElement));
      });
    }

    if (action.type === INCOMING_UPDATE_MESSAGE) {
      const messageElement = this.refs.messages.querySelector(
        `[data-message="${action.value.id}"]`
      );

      const index = state.chat.messages
        .map(message => message.id)
        .indexOf(action.value.id);

      const newElement = new ChatListItem({
        message: action.value,
        key: index
      });

      messageElement.parentNode.replaceChild(
        createElement(newElement),
        messageElement
      );
    }

    if (action.type === ADD_MESSAGE || action.type === ADD_INCOMING_MESSAGE) {
      const index = state.chat.messages.length - 1;
      const message = state.chat.messages[index];
      const messageElement = new ChatListItem({ message, key: index });
      this.refs.messages.appendChild(createElement(messageElement));
    }

    const scrollTypes = [ADD_MESSAGE, SCROLL_TO_BOTTOM];

    if (scrollTypes.includes(action.type)) {
      this.refs.text.scrollTop = this.refs.text.scrollHeight;
    }

    const typingTypes = [SET_TYPING_USER, RESET_TYPING_USERS];

    if (typingTypes.includes(action.type)) {
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
