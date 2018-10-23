const createAction = require("../../lib/createAction");
const {
  SET_SELECTED_CHANNEL,
  SET_CHANNELS,
  ADD_CHANNEL
} = require("./sidebarEvents");

const SetChannels = createAction(SET_CHANNELS);
const AddChannel = createAction(ADD_CHANNEL);
const SetSelectedChannel = createAction(SET_SELECTED_CHANNEL);

module.exports = {
  SetChannels,
  AddChannel,
  SetSelectedChannel
};
