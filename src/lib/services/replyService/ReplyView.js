const UserView = require("../userService/UserView");

const ReplyView = (reply, user, channelId) => {
  const view = Object.assign({}, reply._doc);
  view.channelId = channelId;
  view.user = new UserView(user);
  return view;
};

module.exports = ReplyView;
