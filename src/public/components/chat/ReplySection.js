const Component = require("../component");
const {
  ADD_INCOMING_REPLY,
  ADD_REPLY
} = require("../actionbar/components/thread/threadEvents");

class ReplySection extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber(`reply-section-${props.message.id}`, this.onEvent);
    this.state.count = this.getStoreState().chat.messages.find(
      message => message.id === props.message.id
    ).replyMessages.length;
  }

  onCreated() {
    this.refs.container.style.display = this.state.count > 0 ? "flex" : "none";
  }

  onEvent(state, action) {
    const replies = [ADD_INCOMING_REPLY, ADD_REPLY];

    if (replies.includes(action.type)) {
      if (action.value.messageId === this.props.message.id) {
        const count = this.getStoreState().chat.messages.find(
          message => message.id === this.props.message.id
        ).replyMessages.length;
        this.refs.button.textContent = `${count} replies`;
        this.refs.container.style.display = "flex";
      }
    }
  }

  render() {
    return `
      <div data-ref="container" data-js="reply" class="chat__reply-container">
        <div class="chat__reply-img"></div>
        <button data-ref="button" onclick="chat.openThreadAction(event, '${this.props.message.id}')" class="chat__reply-count">${this.state.count} replies</button>
      </div>
    `;
  }
}

module.exports = ReplySection;
