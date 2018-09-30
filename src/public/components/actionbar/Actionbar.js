const Component = require("../component");
const { CloseActionbar } = require("./actionbarActions");
const { OPEN_ACTIONBAR, CLOSE_ACTIONBAR } = require("./actionbarEvents");
require("./components/thread");
require("./components/file");

class Actionbar extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("actionbar", this.onEvent);
    this.closeActionbar = this.closeActionbar.bind(this);
  }

  closeActionbar(event) {
    event.preventDefault();
    this.dispatch(CloseActionbar());
  }

  onEvent(state, action) {
    if (action.type === OPEN_ACTIONBAR) {
      this.refs.title.textContent = action.value.title;
      const child = this.refs.content.firstChild;
      this.refs.content.replaceChild(action.value.component, child);
      this.refs.actionbar.style.display = "initial";
    } else if (action.type === CLOSE_ACTIONBAR) {
      this.refs.actionbar.style.display = "none";
    }
  }

  render() {
    return `
      <aside data-ref="actionbar" class="actionbar">
        <header class="actionbar__header">
          <h2 data-ref="title">Header</h2>
          <button class="actionbar__close-btn" onclick="actionbar.closeActionbar(event)">&times;</button>
        </header>
        <div data-ref="content"> </div>
      </aside>
    `;
  }
}

module.exports = Actionbar;
