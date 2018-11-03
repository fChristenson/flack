const { SET_SELECTED_MESSAGE_ID, SET_REPLIES } = require("./threadEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case SET_REPLIES:
      return Object.assign({}, state, { messages: action.value });

    case SET_SELECTED_MESSAGE_ID:
      return Object.assign({}, state, { selectedMessageId: action.value });

    default:
      return state;
  }
};
