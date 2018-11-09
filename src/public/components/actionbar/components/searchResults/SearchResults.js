const Component = require("../../../component");
const SearchListItem = require("./SearchResultsListItem");
const createElement = require("../../../../lib/createElement");
const { ScrollSearchResultsToBottom } = require("./searchResultsActions");
const { SET_SEARCH_RESULTS } = require("./searchResultsEvents");
const reducer = require("./searchResultsReducer");
const initState = require("./initState");

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.onEvent = this.onEvent.bind(this);
    this.setReducer("searchResults", reducer, initState);
    this.setSubscriber("searchResults", this.onEvent);
    this.renderMessage = this.renderMessage.bind(this);
  }

  onEvent(state, action) {
    if (action.type === SET_SEARCH_RESULTS) {
      this.refs.results.childNodes.forEach(element => element.remove());
      state.searchResults.searchResults.forEach(message => {
        const messageElement = new SearchListItem({ message });
        this.refs.results.appendChild(createElement(messageElement));
      });
      this.dispatch(ScrollSearchResultsToBottom());
    }
  }

  renderMessage(message, index) {
    this.setChild(`${index}`, new SearchListItem({ message }));
    return `<template data-child="${index}"></template>`;
  }

  render() {
    return `
    <div class="thread__container">
    <ul data-ref="results">
      ${this.getStoreState()
      .searchResults.searchResults.map(this.renderMessage)
      .join("")}
    </ul>
  </div>
    `;
  }
}

module.exports = SearchResults;
