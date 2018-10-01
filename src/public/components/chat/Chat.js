const Component = require("../component");
const ChatMenu = require("./ChatMenu");
const createElement = require("../../lib/createElement");
const { SET_TYPING_USER } = require("./chatEvents");
const { OpenActionbar } = require("../actionbar/actionbarActions");

const LINE_HEIGHT_IN_PIXELS = 14;
const TEXT_AREA_MAX_HEIGHT = 200;
const RETURN_KEY = 13;

const user = "foo" + Math.random();

class Chat extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("chat", this.onEvent);
    this.renderPosts = this.renderPosts.bind(this);
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
    const message = {
      userId: "myId",
      channelId: this.getStoreState().sidebar.selectedChannel._id,
      text: event.target.value
    };
    socket.emit("message", message);
    event.target.value = "";
    document.body.style.setProperty("--message-height", 0);
  }

  openThreadAction(event, postKey) {
    event.preventDefault();
    const title = "Thread";
    const data = { title, component: createElement(window.thread) };
    this.dispatch(OpenActionbar(data));
  }

  openMoreActions(event, postKey) {
    event.preventDefault();
    alert(postKey);
  }

  renderPosts(post, index) {
    this.setChild(`menu-${index}`, new ChatMenu({ postKey: index }));
    return `
      <li class="chat__li">
        <div>
          <img class="chat__img" src="${post.imageUrl}" />
        </div>
        <div>
          <div>
            <span class="chat__username">${post.username}</span>
            <span class="chat__date">${post.createdAt}</span>
          </div>
          <div class="chat__text">${post.text}</div>
        </div>
        <template data-child="menu-${index}"></template>
      </li>
    `;
  }

  onEvent(state, action) {
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
          <ul>
            ${this.props.posts.map(this.renderPosts).join("")}
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
