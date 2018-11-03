const {
  ADD_TEXT_AREA_ROW,
  SET_TEXT_AREA_HEIGHT,
  RESET_TEXT_AREA_HEIGHT
} = require("./messageTextAreaEvents");
const createAction = require("../../lib/createAction");

const AddTextAreaRow = createAction(ADD_TEXT_AREA_ROW);
const SetTextAreaHeight = createAction(SET_TEXT_AREA_HEIGHT);
const ResetTextAreaHeight = createAction(RESET_TEXT_AREA_HEIGHT);

module.exports = {
  AddTextAreaRow,
  SetTextAreaHeight,
  ResetTextAreaHeight
};
