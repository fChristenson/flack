const Component = require("../component");
const { SET_SELECTED_CHANNEL } = require("../sidebar/sidebarEvents");

class Header extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("header", this.onEvent);
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(event) {
    event.preventDefault();
    alert("Search");
  }

  onEvent(state, action) {
    if (action.type === SET_SELECTED_CHANNEL) {
      this.refs.h1.textContent = state.sidebar.selectedChannel;
    }
  }

  render() {
    return `
      <header class="header">
        <h1 class="header__title" data-ref="h1">${this.getStoreState().sidebar.selectedChannel}</h1>
        <form onsubmit="header.onSearch(event)">
          <input class="header__search" type="text" placeholder="Search" />
        </form>
      </header>
    `;
  }
}

module.exports = Header;
