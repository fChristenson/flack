const { SET_SELECTED_CHANNEL, SET_CHANNELS } = require("./sidebarEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return Object.assign({}, state, { channels: action.value });

    case SET_SELECTED_CHANNEL:
      return Object.assign({}, state, { selectedChannel: action.value });

    default:
      return state;
  }
};
