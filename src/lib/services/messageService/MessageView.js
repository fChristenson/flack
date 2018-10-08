const UserView = require("../userService/UserView");

const MessageView = (message, user) => {
  const view = Object.assign({}, message._doc, { user: UserView(user) });
  delete view.userId;
  return view;
};

module.exports = MessageView;
