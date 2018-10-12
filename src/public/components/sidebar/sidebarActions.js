const createAction = require("../../lib/createAction");
const { SET_SELECTED_CHANNEL, SET_CHANNELS } = require("./sidebarEvents");

const SetChannels = createAction(SET_CHANNELS);
const SetSelectedChannel = createAction(SET_SELECTED_CHANNEL);

module.exports = {
  SetChannels,
  SetSelectedChannel
};
