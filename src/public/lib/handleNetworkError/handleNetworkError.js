const store = require("../store");
const {
  ShowError,
  HideSnackbar
} = require("../../components/snackbar/snackbarActions");

module.exports = function(fn) {
  return function() {
    const val = fn.apply(this, arguments);

    return val.then(data => {
      if (data && data.error) {
        store.dispatch(ShowError(data.error));
        setTimeout(() => {
          store.dispatch(HideSnackbar());
        }, 1500);
      }

      return data;
    });
  };
};
