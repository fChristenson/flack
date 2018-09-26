const { SET_SELECTED_CHANNEL } = require("./sidebarEvents");

const SetSelectedChannel = value => {
  return {
    type: SET_SELECTED_CHANNEL,
    value
  };
};

module.exports = {
  SetSelectedChannel
};
