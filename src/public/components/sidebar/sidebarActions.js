const { SET_SELECTED_CHANNEL, SET_CHANNELS } = require("./sidebarEvents");

const SetChannels = value => {
  return {
    type: SET_CHANNELS,
    value
  };
};

const SetSelectedChannel = value => {
  return {
    type: SET_SELECTED_CHANNEL,
    value
  };
};

module.exports = {
  SetChannels,
  SetSelectedChannel
};
