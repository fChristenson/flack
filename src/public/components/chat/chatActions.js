const createAction = require("../../lib/createAction");
const {
  SET_TYPING_USER,
  RESET_TYPING_USERS,
  SET_MESSAGES,
  SCROLL_TO_BOTTOM,
  GET_MESSAGES,
  ADD_MESSAGE,
  INCOMING_UPDATE_MESSAGE,
  INCOMING_DELETE_MESSAGE,
  ADD_INCOMING_MESSAGE,
  DELETE_MESSAGE,
  SET_UPDATE_MESSAGE,
  EDIT_MESSAGE,
  UPDATE_MESSAGE,
  STOP_EDIT_MESSAGE
} = require("./chatEvents");

const StopEditMessage = createAction(STOP_EDIT_MESSAGE);
const EditMessage = createAction(EDIT_MESSAGE);
const ScrollToBottom = createAction(SCROLL_TO_BOTTOM);
const ResetTypingUsers = createAction(RESET_TYPING_USERS);
const SetTypingUser = createAction(SET_TYPING_USER);
const AddIncomingMessage = createAction(ADD_INCOMING_MESSAGE);
const AddMessage = createAction(ADD_MESSAGE);
const DeleteMessage = createAction(DELETE_MESSAGE);
const GetMessages = createAction(GET_MESSAGES);
const SetMessages = createAction(SET_MESSAGES);
const UpdateMessage = createAction(UPDATE_MESSAGE);
const SetUpdateMessage = createAction(SET_UPDATE_MESSAGE);
const IncomingUpdateMessage = createAction(INCOMING_UPDATE_MESSAGE);
const IncomingDeleteMessage = createAction(INCOMING_DELETE_MESSAGE);

module.exports = {
  SetTypingUser,
  StopEditMessage,
  SetUpdateMessage,
  EditMessage,
  DeleteMessage,
  IncomingUpdateMessage,
  IncomingDeleteMessage,
  ScrollToBottom,
  UpdateMessage,
  ResetTypingUsers,
  SetMessages,
  AddMessage,
  AddIncomingMessage,
  GetMessages
};
