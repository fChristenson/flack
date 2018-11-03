const Component = require("../component");
const ChatListItem = require("./ChatListItem");
const createElement = require("../../lib/createElement");
const {
  SetReplies,
  SetSelectedMessageId
} = require("../actionbar/components/thread/threadActions");
const Reply = require("../actionbar/components/thread/Reply");
const {
  SET_TYPING_USER,
  RESET_TYPING_USERS,
  ADD_MESSAGE,
  SCROLL_TO_BOTTOM,
  INCOMING_UPDATE_MESSAGE,
  SET_MESSAGES,
  INCOMING_DELETE_MESSAGE,
  DELETE_MESSAGE,
  ADD_INCOMING_MESSAGE
} = require("./chatEvents");
const { deleteMessage, getReplies } = require("../../lib/api/chatApi");
const MessageMenu = require("./components/messageMenu/MessageMenu");
const Message = require("./Message");
const Thread = require("../actionbar/components/thread/Thread");
const {
  UpdateMessage,
  DeleteMessage,
  EditMessage,
  StopEditMessage
} = require("./chatActions");
const { OpenActionbar } = require("../actionbar/actionbarActions");
const MessageTextArea = require("../messageTextArea/MessageTextArea");
const {
  ResetTextAreaHeight,
  AddTextAreaRow
} = require("../messageTextArea/messageTextAreaActions");
const {
  ScrollThreadToBottom
} = require("../actionbar/components/thread/threadActions");

const RETURN_KEY = 13;
const textAreaName = "chatTextArea";

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
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveUpdatedMessage = this.saveUpdatedMessage.bind(this);
  }

  async saveUpdatedMessage(event, messageId) {
    event.preventDefault();
    this.dispatch(UpdateMessage(messageId));
  }

  cancelEdit(event, messageId) {
    event.preventDefault();
    this.dispatch(StopEditMessage(messageId));
  }

  setEditMessage(event, messageId) {
    event.preventDefault();
    this.dispatch(EditMessage(messageId));
  }

  async editMessage(event, messageId) {
    event.preventDefault();
    if (event.keyCode === RETURN_KEY && !event.shiftKey) {
      await this.saveUpdatedMessage(event, messageId);
    } else if (event.keyCode === RETURN_KEY) {
      this.dispatch(AddTextAreaRow("edit-text"));
    }

    if (event.target.value.length < 1) {
      this.dispatch(ResetTextAreaHeight("edit-text"));
    }
  }

  async deleteMessage(event, messageId) {
    event.preventDefault();
    const incoming = await deleteMessage(messageId);
    const message = new Message(incoming);
    this.dispatch(DeleteMessage(message));
    window.socket.emit("delete-message", message);
  }

  postMessage(event) {
    event.preventDefault();
    if (event.keyCode === RETURN_KEY && !event.shiftKey) {
      this._sendMessage(event, "message");
    } else if (event.keyCode === RETURN_KEY) {
      this.dispatch(AddTextAreaRow(textAreaName));
    }

    const user = this.getStoreState().app.user.username;
    const channelId = this.getStoreState().sidebar.selectedChannel.id;

    if (event.target.value.length < 1) {
      this.dispatch(ResetTextAreaHeight(textAreaName));
      window.socket.emit("stopped-typing", { channelId, user });
    } else if (event.target.value.length > 0) {
      window.socket.emit("started-typing", { channelId, user });
    }
  }

  _sendMessage(event, eventName) {
    const state = this.getStoreState();
    const message = {
      userId: state.app.user.id,
      channelId: state.sidebar.selectedChannel.id,
      text: event.target.value
    };
    window.socket.emit(eventName, message);
    event.target.value = "";
    this.dispatch(ResetTextAreaHeight(textAreaName));
  }

  async openThreadAction(event, messageId) {
    event.preventDefault();
    const title = "Thread";
    const incomingReplies = await getReplies(messageId);
    const replies = incomingReplies.map(incoming => new Reply(incoming));
    window.thread = new Thread();
    const data = { title, component: createElement(window.thread) };
    this.dispatch(SetReplies(replies));
    this.dispatch(SetSelectedMessageId(messageId));
    this.dispatch(OpenActionbar(data));
    this.dispatch(ScrollThreadToBottom());
  }

  closeMessageMenu(event) {
    event.preventDefault();
    this.state.messageMenu.remove();
  }

  openMoreActions(event, messageId) {
    event.preventDefault();
    const targetDimensions = event.target.getBoundingClientRect();
    const targetX = targetDimensions.x;
    const targetY = targetDimensions.y;
    const username = this.getStoreState().chat.messages.find(
      message => message.id === messageId
    ).username;
    const renderElements = username === this.getStoreState().app.user.username;
    const component = new MessageMenu({ renderElements, messageId });
    const node = createElement(component);
    this.state.messageMenu = node;
    document.body.appendChild(this.state.messageMenu);
    const menu = this.state.messageMenu.querySelector("[data-js=menu]");
    const menuDimensions = menu.getBoundingClientRect();
    const menuX = targetX - menuDimensions.width;
    const menuY = targetY;
    menu.style.top = `${menuY}px`;
    menu.style.left = `${menuX}px`;
  }

  renderMessage(message, index) {
    this.setChild(`${index}`, new ChatListItem({ message }));
    return `<template data-child="${index}"></template>`;
  }

  async onEvent(state, action) {
    if (action.type === INCOMING_DELETE_MESSAGE) {
      const messageId = action.value;
      const node = Array.from(this.refs.messages.childNodes).find(
        el => el.getAttribute("data-message") === messageId
      );

      if (node) node.remove();
    }

    if (action.type === DELETE_MESSAGE) {
      const messageId = action.value.id;
      const node = Array.from(this.refs.messages.childNodes).find(
        el => el.getAttribute("data-message") === messageId
      );

      if (node) node.remove();
    }

    if (action.type === SET_MESSAGES) {
      Array.from(this.refs.messages.childNodes).forEach(el => el.remove());
      state.chat.messages.forEach(message => {
        const messageElement = new ChatListItem({ message });
        this.refs.messages.appendChild(createElement(messageElement));
      });
    }

    if (action.type === INCOMING_UPDATE_MESSAGE) {
      const messageElement = this.refs.messages.querySelector(
        `[data-message="${action.value.id}"]`
      );

      const newElement = new ChatListItem({
        message: action.value
      });

      messageElement.parentNode.replaceChild(
        createElement(newElement),
        messageElement
      );
    }

    if (action.type === ADD_MESSAGE || action.type === ADD_INCOMING_MESSAGE) {
      const index = state.chat.messages.length - 1;
      const message = state.chat.messages[index];
      const messageElement = new ChatListItem({ message });
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
    this.setChild(
      "textarea",
      new MessageTextArea({
        text: "",
        heightVariableString: "--message-height",
        textAreaName,
        dataJsName: "",
        className: "chat__input",
        placeholderText: "Message",
        onKeyupString: "chat.postMessage(event)"
      })
    );
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
          <template data-child="textarea"></template>
        </div>
      </div>
    `;
  }
}

module.exports = Chat;
