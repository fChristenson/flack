const createAction = require("../../lib/createAction");
const { OPEN_ACTIONBAR, CLOSE_ACTIONBAR } = require("./actionbarEvents");

const OpenActionbar = createAction(OPEN_ACTIONBAR);
const CloseActionbar = createAction(CLOSE_ACTIONBAR);

module.exports = {
  OpenActionbar,
  CloseActionbar
};
