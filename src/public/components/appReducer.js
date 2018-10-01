const { SET_USER } = require("./appEvents");

module.exports = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, { user: action.value });

    default:
      return state;
  }
};
