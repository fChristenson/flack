const createAction = require("../lib/createAction");
const { SET_USER } = require("./appEvents");

const SetUser = createAction(SET_USER);

module.exports = {
  SetUser
};
