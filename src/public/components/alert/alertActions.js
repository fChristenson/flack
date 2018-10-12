const createAction = require("../../lib/createAction");
const {
  SHOW_ALERT,
  CLOSE_ALERT,
  FILTER_DIRECT_MESSAGES
} = require("./alertEvents");

const FilterDirectMessages = createAction(FILTER_DIRECT_MESSAGES);
const ShowAlert = createAction(SHOW_ALERT);
const CloseAlert = createAction(CLOSE_ALERT);

module.exports = {
  FilterDirectMessages,
  ShowAlert,
  CloseAlert
};
