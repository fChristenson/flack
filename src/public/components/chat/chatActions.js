const {
  SET_TYPING_USER,
  SET_MESSAGES,
  GET_MESSAGES,
  ADD_MESSAGE,
  ADD_INCOMING_MESSAGE
} = require("./chatEvents");

const SetTypingUser = value => {
  return {
    type: SET_TYPING_USER,
    value
  };
};

const AddIncomingMessage = value => {
  return {
    type: ADD_INCOMING_MESSAGE,
    value
  };
};

const AddMessage = value => {
  return {
    type: ADD_MESSAGE,
    value
  };
};

const GetMessages = () => {
  return {
    type: GET_MESSAGES
  };
};

const SetMessages = value => {
  return {
    type: SET_MESSAGES,
    value
  };
};

module.exports = {
  SetTypingUser,
  SetMessages,
  AddMessage,
  AddIncomingMessage,
  GetMessages
};
