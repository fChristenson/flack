const { SET_USER } = require("./appEvents");

const SetUser = value => {
  return {
    type: SET_USER,
    value
  };
};

module.exports = {
  SetUser
};
