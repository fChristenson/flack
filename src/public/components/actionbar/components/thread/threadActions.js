const createAction = require("../../../../lib/createAction");
const {
  SCROLL_THREAD_TO_BOTTOM,
  ADD_REPLY,
  SET_SELECTED_MESSAGE_ID,
  ADD_INCOMING_REPLY,
  SET_REPLIES
} = require("./threadEvents");

const ScrollThreadToBottom = createAction(SCROLL_THREAD_TO_BOTTOM);
const AddReply = createAction(ADD_REPLY);
const SetReplies = createAction(SET_REPLIES);
const SetSelectedMessageId = createAction(SET_SELECTED_MESSAGE_ID);
const AddIncomingReply = createAction(ADD_INCOMING_REPLY);

module.exports = {
  AddReply,
  SetReplies,
  SetSelectedMessageId,
  AddIncomingReply,
  ScrollThreadToBottom
};
