const createAction = require("../../lib/createAction");
const {
  SHOW_ALERT,
  CLOSE_ALERT,
  FILTER_DIRECT_MESSAGES,
  FILTER_CHANNELS,
  SHOW_CREATE_CHANNEL
} = require("./alertEvents");

const FilterDirectMessages = createAction(FILTER_DIRECT_MESSAGES);
const FilterChannels = createAction(FILTER_CHANNELS);
const ShowAlert = createAction(SHOW_ALERT);
const ShowCreateChannel = createAction(SHOW_CREATE_CHANNEL);
const CloseAlert = createAction(CLOSE_ALERT);

module.exports = {
  ShowCreateChannel,
  FilterChannels,
  FilterDirectMessages,
  ShowAlert,
  CloseAlert
};
