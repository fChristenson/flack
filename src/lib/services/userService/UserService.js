class UserService {
  constructor(Model) {
    this.Model = Model;
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.setLastVisitedChannel = this.setLastVisitedChannel.bind(this);
  }

  async setLastVisitedChannel(userId, channelId) {
    const user = await this.getUser(userId);
    user.lastVisitedChannel = channelId;
    return user.save();
  }

  createUser(name) {
    return new this.Model({ name }).save();
  }

  getUser(userId) {
    return this.Model.findById(userId);
  }

  getUsers(userIdArray) {
    return this.Model.find({ _id: { $in: userIdArray } });
  }
}

module.exports = UserService;
