const {
  SET_TYPING_USER,
  SET_MESSAGES,
  RESET_TYPING_USERS,
  ADD_MESSAGE,
  ADD_INCOMING_MESSAGE,
  DELETE_MESSAGE,
  INCOMING_DELETE_MESSAGE,
  SET_UPDATE_MESSAGE
} = require("./chatEvents");
const {
  ADD_INCOMING_REPLY,
  ADD_REPLY
} = require("../actionbar/components/thread/threadEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case ADD_REPLY:
    case ADD_INCOMING_REPLY: {
      const messages = state.messages.map(message => {
        if (message.id === action.value.messageId) {
          message.replyMessages.push(action.value.id);
          return message;
        } else {
          return message;
        }
      });
      return Object.assign({}, state, { messages });
    }

    case INCOMING_DELETE_MESSAGE: {
      const messages = state.messages.filter(
        message => message.id !== action.value
      );
      return Object.assign({}, state, { messages });
    }

    case DELETE_MESSAGE: {
      const messages = state.messages.filter(
        message => message.id !== action.value.id
      );
      return Object.assign({}, state, { messages });
    }

    case SET_UPDATE_MESSAGE: {
      const messages = state.messages.map(message => {
        if (message.id === action.value.id) return action.value;
        return message;
      });
      return Object.assign({}, state, { messages });
    }

    case ADD_INCOMING_MESSAGE:
    case ADD_MESSAGE: {
      const messages = state.messages.concat([action.value]);
      return Object.assign({}, state, { messages });
    }

    case SET_MESSAGES:
      return Object.assign({}, state, { messages: action.value });

    case RESET_TYPING_USERS:
      return Object.assign({}, state, { typingUsers: {} });

    case SET_TYPING_USER: {
      const typingUsers = Object.assign({}, state.typingUsers, {
        [action.value.user]: action.value.isTyping
      });
      return Object.assign({}, state, { typingUsers });
    }

    default:
      return state;
  }
};
