const Component = require("../component");
const ChatMenu = require("./ChatMenu");
const createElement = require("../../lib/createElement");
const { OpenActionbar } = require("../actionbar/actionbarActions");
const socketIO = require("socket.io-client");
const socket = socketIO();

const LINE_HEIGHT_IN_PIXELS = 14;
const TEXT_AREA_MAX_HEIGHT = 200;
const RETURN_KEY = 13;
const BACKSPACE_KEY = 8;

class Chat extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("chat", this.onEvent);
    this.renderPosts = this.renderPosts.bind(this);
    this.openMoreActions = this.openMoreActions.bind(this);
    this.openThreadAction = this.openThreadAction.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  postMessage(event) {
    event.preventDefault();
    if (event.keyCode === RETURN_KEY && !event.shiftKey) {
      const message = event.target.value;
      event.target.value = "";
      socket.emit("message", message);
      document.body.style.setProperty("--message-height", 0);
    } else if (event.keyCode === RETURN_KEY) {
      const heightString = document.body.style.getPropertyValue(
        "--message-height"
      );
      const height = parseInt(heightString || 0);
      const newHeight = Math.min(
        TEXT_AREA_MAX_HEIGHT,
        height + LINE_HEIGHT_IN_PIXELS
      );
      document.body.style.setProperty("--message-height", newHeight);
    } else if (
      event.keyCode === BACKSPACE_KEY && event.target.value.length < 1
    ) {
      document.body.style.setProperty("--message-height", 0);
    }
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

  onEvent(state, action) {}

  render() {
    return `
      <div class="chat__container">
        <div data-ref="text" class="chat__text-container">
          <ul>
            ${this.props.posts.map(this.renderPosts).join("")}
          </ul>
          <div class="chat__typing">Someone is typing...</div>
        </div>
        <div class="chat__input-container">
          <textarea onkeyup="chat.postMessage(event)" class="chat__input" placeholder="Message"></textarea>
        </div>
      </div>
    `;
  }
}

module.exports = Chat;
