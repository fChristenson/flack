const createAction = require("../../../../lib/createAction");
const {
  SCROLL_SEARCH_RESULTS_TO_BOTTOM,
  SET_SEARCH_RESULTS
} = require("./searchResultsEvents");

const ScrollSearchResultsToBottom = createAction(
  SCROLL_SEARCH_RESULTS_TO_BOTTOM
);
const SetSearchResults = createAction(SET_SEARCH_RESULTS);

module.exports = {
  SetSearchResults,
  ScrollSearchResultsToBottom
};
