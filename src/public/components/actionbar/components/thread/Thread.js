const Component = require("../../../component");
const ThreadListItem = require("./ThreadListItem");
const MessageTextArea = require("../../../messageTextArea/MessageTextArea");
const createElement = require("../../../../lib/createElement");
const { ScrollThreadToBottom } = require("./threadActions");
const {
  AddTextAreaRow,
  ResetTextAreaHeight
} = require("../../../messageTextArea/messageTextAreaActions");
const {
  ADD_REPLY,
  ADD_INCOMING_REPLY,
  SET_REPLIES
} = require("./threadEvents");
const reducer = require("./threadReducer");
const initState = require("./initState");
const RETURN_KEY = 13;
class Thread extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setReducer("thread", reducer, initState);
    this.setSubscriber("thread", this.onEvent);
    this.renderMessage = this.renderMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  onEvent(state, action) {
    if (action.type === SET_REPLIES) {
      this.refs.messages.childNodes.forEach(element => element.remove());
      state.thread.messages.forEach(message => {
        const messageElement = new ThreadListItem({ message });
        this.refs.messages.appendChild(createElement(messageElement));
      });
      this.dispatch(ScrollThreadToBottom());
    }

    if (action.type === ADD_INCOMING_REPLY) {
      if (action.value.messageId === state.thread.selectedMessageId) {
        const messageElement = new ThreadListItem({ message: action.value });
        this.refs.messages.appendChild(createElement(messageElement));
      }
    }

    if (action.type === ADD_REPLY) {
      const messageElement = new ThreadListItem({ message: action.value });
      this.refs.messages.appendChild(createElement(messageElement));
      this.dispatch(ScrollThreadToBottom());
    }
  }

  postMessage(event) {
    event.preventDefault();
    const textarea = this.refs.content.querySelector("[data-js=reply-text]");

    if (!event.keyCode || (event.keyCode === RETURN_KEY && !event.shiftKey)) {
      const message = {
        channelId: this.getStoreState().sidebar.selectedChannel.id,
        userId: this.getStoreState().app.user.id,
        messageId: this.getStoreState().thread.selectedMessageId,
        text: textarea.value || "\n"
      };
      window.socket.emit("reply", message);
      textarea.value = "";
      this.dispatch(ResetTextAreaHeight("thread-text"));
    } else if (event.keyCode === RETURN_KEY) {
      this.dispatch(AddTextAreaRow("thread-text"));
      this.dispatch(ScrollThreadToBottom());
    }

    if (textarea.value.length < 1) {
      this.dispatch(ResetTextAreaHeight("thread-text"));
    }
  }

  renderMessage(message, index) {
    this.setChild(`${index}`, new ThreadListItem({ message }));
    return `<template data-child="${index}"></template>`;
  }

  render() {
    this.setChild(
      "thread-textarea",
      new MessageTextArea({
        text: "",
        heightVariableString: "--thread-message-height",
        textAreaName: "thread-text",
        dataJsName: "reply-text",
        className: "thread__input",
        placeholderText: "Reply",
        onKeyupString: "thread.postMessage(event)"
      })
    );
    return `
    <div class="thread__container">
    <ul data-ref="messages">
      ${this.getStoreState().thread.messages.map(this.renderMessage).join("")}
    </ul>
    <div data-ref="content" class="thread__input-container">
      <template data-child="thread-textarea"></template>
      <div class="thread__send-container">
        <button class="thread__send-button" onclick="thread.postMessage(event)">Send</button>
      </div>
    </div>
  </div>
    `;
  }
}

module.exports = Thread;
