const createAction = require("../../lib/createAction");
const {
  SET_TYPING_USER,
  RESET_TYPING_USERS,
  SET_MESSAGES,
  SCROLL_TO_BOTTOM,
  GET_MESSAGES,
  ADD_MESSAGE,
  ADD_INCOMING_MESSAGE
} = require("./chatEvents");

const ScrollToBottom = createAction(SCROLL_TO_BOTTOM);
const ResetTypingUsers = createAction(RESET_TYPING_USERS);
const SetTypingUser = createAction(SET_TYPING_USER);
const AddIncomingMessage = createAction(ADD_INCOMING_MESSAGE);
const AddMessage = createAction(ADD_MESSAGE);
const GetMessages = createAction(GET_MESSAGES);
const SetMessages = createAction(SET_MESSAGES);

module.exports = {
  SetTypingUser,
  ScrollToBottom,
  ResetTypingUsers,
  SetMessages,
  AddMessage,
  AddIncomingMessage,
  GetMessages
};
