const createAction = require("../../lib/createAction");
const {
  SHOW_ALERT,
  CLOSE_ALERT,
  FILTER_DIRECT_MESSAGES,
  FILTER_CHANNELS
} = require("./alertEvents");

const FilterDirectMessages = createAction(FILTER_DIRECT_MESSAGES);
const FilterChannels = createAction(FILTER_CHANNELS);
const ShowAlert = createAction(SHOW_ALERT);
const CloseAlert = createAction(CLOSE_ALERT);

module.exports = {
  FilterChannels,
  FilterDirectMessages,
  ShowAlert,
  CloseAlert
};
