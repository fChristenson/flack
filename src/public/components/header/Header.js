const Component = require("../component");
const { leaveChannel } = require("../../lib/api/channelsApi");
const { getSearchResults } = require("../../lib/api/searchApi");
const createElement = require("../../lib/createElement");
const Message = require("../chat/Message");
const { OpenActionbar } = require("../actionbar/actionbarActions");
const SearchResults = require("../actionbar/components/searchResults/SearchResults");
const {
  SetSearchResults,
  ScrollSearchResultsToBottom
} = require("../actionbar/components/searchResults/searchResultsActions");
const { SET_SELECTED_CHANNEL } = require("../sidebar/sidebarEvents");

class Header extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setSubscriber("header", this.onEvent);
    this.onSearch = this.onSearch.bind(this);
    this.leaveChannel = this.leaveChannel.bind(this);
    this._getLeaveClass = this._getLeaveClass.bind(this);
  }

  async leaveChannel(event) {
    event.preventDefault();
    const channelId = this.getStoreState().sidebar.selectedChannel.id;
    await leaveChannel(channelId);
    const general = this.getStoreState().sidebar.channels.find(
      channel => channel.name === "general"
    );
    window.socket.emit("leave", channelId);
    window.location.hash = `#/channels/${general.id}`;
  }

  async onSearch(event) {
    event.preventDefault();
    const title = "Search results";
    const incomingResults = await getSearchResults(event.target.search.value);
    const results = incomingResults.map(incoming => new Message(incoming));
    window.searchResults = new SearchResults();
    const data = { title, component: createElement(window.searchResults) };
    this.dispatch(SetSearchResults(results));
    this.dispatch(OpenActionbar(data));
    this.dispatch(ScrollSearchResultsToBottom());
    event.target.search.value = "";
  }

  onEvent(state, action) {
    if (action.type === SET_SELECTED_CHANNEL) {
      this.refs.h1.textContent = action.value.name;
      this.refs.leaveButton.classList.remove("header__leave--hide");
      this.refs.leaveButton.classList.remove("header__leave");
      const leaveClass = this._getLeaveClass();
      this.refs.leaveButton.classList.add(leaveClass);
    }
  }

  _getLeaveClass() {
    const isGeneral =
      this.getStoreState().sidebar.selectedChannel.name === "general";
    return isGeneral ? "header__leave--hide" : "header__leave";
  }

  render() {
    const leaveClass = this._getLeaveClass();
    return `
      <header class="header">
        <h1 class="header__title" data-ref="h1">${this.getStoreState().sidebar.selectedChannel.name}</h1>
        <div class="header__search-container">
          <button data-ref="leaveButton" class="${leaveClass}" onclick="header.leaveChannel(event)">Leave</button>
          <form onsubmit="header.onSearch(event)">
            <input name="search" class="header__search" type="text" placeholder="Search" />
          </form>
          <span class="header__username">${this.getStoreState().app.user.username}</span>
          <a class="header__logout" href="/logout">Logout</a>
        </div>
      </header>
    `;
  }
}

module.exports = Header;
