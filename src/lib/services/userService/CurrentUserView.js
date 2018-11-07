const UserView = require("./UserView");

class CurrentUserView extends UserView {
  constructor(user) {
    super(user);
    this.lastVisitedChannelId = user.lastVisitedChannelId;
    this.unreadMessages = user.unreadMessages;
  }
}

module.exports = CurrentUserView;
