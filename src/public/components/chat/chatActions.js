const { SET_TYPING_USER } = require("./chatEvents");

const SetTypingUser = value => {
  return {
    type: SET_TYPING_USER,
    value
  };
};

module.exports = {
  SetTypingUser
};
