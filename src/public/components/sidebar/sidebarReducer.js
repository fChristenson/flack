const { SET_SELECTED_CHANNEL } = require("./sidebarEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case SET_SELECTED_CHANNEL:
      return Object.assign({}, state, { selectedChannel: action.value });

    default:
      return state;
  }
};
