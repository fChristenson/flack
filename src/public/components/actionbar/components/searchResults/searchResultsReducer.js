const { SET_SEARCH_RESULTS } = require("./searchResultsEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return Object.assign({}, state, { searchResults: action.value });

    default:
      return state;
  }
};
