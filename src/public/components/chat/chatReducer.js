const { SET_TYPING_USER } = require("./chatEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case SET_TYPING_USER:
      const typingUsers = Object.assign({}, state.typingUsers, {
        [action.value.user]: action.value.isTyping
      });
      return Object.assign({}, state, { typingUsers });

    default:
      return state;
  }
};
