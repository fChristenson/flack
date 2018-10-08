const {
  SET_TYPING_USER,
  SET_MESSAGES,
  ADD_MESSAGE,
  ADD_INCOMING_MESSAGE
} = require("./chatEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case ADD_INCOMING_MESSAGE:
    case ADD_MESSAGE:
      const messages = state.messages.concat([action.value]);
      return Object.assign({}, state, { messages });

    case SET_MESSAGES:
      return Object.assign({}, state, { messages: action.value });

    case SET_TYPING_USER:
      const typingUsers = Object.assign({}, state.typingUsers, {
        [action.value.user]: action.value.isTyping
      });
      return Object.assign({}, state, { typingUsers });

    default:
      return state;
  }
};
