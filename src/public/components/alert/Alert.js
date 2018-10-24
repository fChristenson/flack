const Component = require("../component");
const {
  SHOW_ALERT,
  CLOSE_ALERT,
  SHOW_CREATE_CHANNEL
} = require("./alertEvents");
const { CloseAlert } = require("./alertActions");

class Alert extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.close = this.close.bind(this);
    this.setSubscriber("alert", this.onEvent);
  }

  close() {
    this.dispatch(CloseAlert());
  }

  onEvent(state, action) {
    if (action.type === SHOW_ALERT) {
      const child = this.refs.content.firstChild;
      this.refs.content.replaceChild(action.value, child);
      this.refs.alert.classList.add("alert--show");
    }

    if (action.type === SHOW_CREATE_CHANNEL) {
      const child = this.refs.content.firstChild;
      this.refs.content.replaceChild(action.value, child);
    }

    if (action.type === CLOSE_ALERT) {
      this.refs.alert.classList.remove("alert--show");
    }
  }

  render() {
    return `
      <div data-ref="alert" class="alert">
        <div data-ref="content"> </div>
      </div>
    `;
  }
}

module.exports = Alert;
