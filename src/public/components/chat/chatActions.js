const createAction = require("../../lib/createAction");
const {
  SET_TYPING_USER,
  SET_MESSAGES,
  GET_MESSAGES,
  ADD_MESSAGE,
  ADD_INCOMING_MESSAGE
} = require("./chatEvents");

const SetTypingUser = createAction(SET_TYPING_USER);
const AddIncomingMessage = createAction(ADD_INCOMING_MESSAGE);
const AddMessage = createAction(ADD_MESSAGE);
const GetMessages = createAction(GET_MESSAGES);
const SetMessages = createAction(SET_MESSAGES);

module.exports = {
  SetTypingUser,
  SetMessages,
  AddMessage,
  AddIncomingMessage,
  GetMessages
};
