const Component = require("../component");
const { SHOW_ALERT, CLOSE_ALERT } = require("./alertEvents");
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
      this.refs.title.textContent = action.value.title;
      const child = this.refs.content.firstChild;
      this.refs.content.replaceChild(action.value.component, child);
      this.refs.alert.classList.add("alert--show");
    } else if (action.type === CLOSE_ALERT) {
      this.refs.alert.classList.remove("alert--show");
    }
  }

  render() {
    return `
      <div data-ref="alert" class="alert">
        <header class="alert__header">
          <button class="alert__button" onclick="alertModal.close()">
            <div class="alert__times">&times;</div>
            esc
          </button>
        </header>
        <div class="alert__content-container">
          <h1 data-ref="title"></h1>
          <div data-ref="content"> </div>
        </div>
      </div>
    `;
  }
}

module.exports = Alert;
