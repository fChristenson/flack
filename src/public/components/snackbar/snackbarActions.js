const { SHOW_ERROR, HIDE_SNACKBAR } = require("./snackbarEvents");
const createAction = require("../../lib/createAction");

const ShowError = createAction(SHOW_ERROR);
const HideSnackbar = createAction(HIDE_SNACKBAR);

module.exports = {
  HideSnackbar,
  ShowError
};
