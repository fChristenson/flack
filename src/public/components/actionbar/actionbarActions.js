const { OPEN_ACTIONBAR, CLOSE_ACTIONBAR } = require("./actionbarEvents");

const OpenActionbar = value => {
  return {
    type: OPEN_ACTIONBAR,
    value
  };
};

const CloseActionbar = () => {
  return {
    type: CLOSE_ACTIONBAR,
    value: true
  };
};

module.exports = {
  OpenActionbar,
  CloseActionbar
};
