const Component = require("../component");
const { SHOW_ERROR, HIDE_SNACKBAR } = require("./snackbarEvents");

class Snackbar extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("snackbar", this.onEvent);
  }

  onEvent(state, action) {
    if (action.type === SHOW_ERROR) {
      this.refs.snackbar.textContent = action.value;
      this.refs.snackbar.classList.remove("snackbar--show");
      this.refs.snackbar.classList.add("snackbar--show");
    }

    if (action.type === HIDE_SNACKBAR) {
      this.refs.snackbar.classList.remove("snackbar--show");
    }
  }

  render() {
    return `
      <div data-ref="snackbar" class="snackbar">
        ${this.props.message}
      </div>
    `;
  }
}

module.exports = Snackbar;
