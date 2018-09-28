const Component = require("../component");
const ChatMenu = require("./ChatMenu");

class Chat extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("chat", this.onEvent);
    this.renderPosts = this.renderPosts.bind(this);
    this.openMoreActions = this.openMoreActions.bind(this);
    this.openThreadAction = this.openThreadAction.bind(this);
  }

  openThreadAction(event, postKey) {
    event.preventDefault();
    alert(postKey);
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
        <ul>
          ${this.props.posts.map(this.renderPosts).join("")}
        </ul>
        <div class="chat__typing">Someone is typing...</div>
      </div>
    `;
  }
}

module.exports = Chat;
