const bcrypt = require("bcrypt");
const CurrentUserView = require("./CurrentUserView");
const UserView = require("./UserView");
const SALT_ROUNDS = 10;

class UserService {
  constructor(Model) {
    this.Model = Model;
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.setLastVisitedChannel = this.setLastVisitedChannel.bind(this);
    this.getUsersInChat = this.getUsersInChat.bind(this);
    this.getCurrentUserView = this.getCurrentUserView.bind(this);
  }

  async loginUser(username, password) {
    const maybeUser = await this.Model.findOne({ username });

    if (!maybeUser) throw new Error("unauthorized");

    const isCorrectPassword = await bcrypt.compare(
      password,
      maybeUser.password
    );

    if (!isCorrectPassword) throw new Error("unauthorized");

    return maybeUser;
  }

  async registerUser(username, password) {
    const maybeUser = await this.Model.findOne({ username });

    if (maybeUser) throw new Error("Username taken");

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return new this.Model({ username, password: hash }).save();
  }

  async setLastVisitedChannel(userId, channelId) {
    const user = await this.getUser(userId);
    user.lastVisitedChannelId = channelId;
    return user.save();
  }

  async createUser(name) {
    const user = await this.Model.find({ name });
    if (user) throw new Error(`${name} is taken`);
    return new this.Model({ name }).save();
  }

  getUsersInChat() {
    return this.Model.find({});
  }

  getUser(userId) {
    return this.Model.findById(userId);
  }

  async getCurrentUserView(userId) {
    const user = await this.Model.findById(userId);
    if (!user) throw new Error(`User not found for id: ${userId}`);
    return new CurrentUserView(user);
  }

  getUsers(userIdArray) {
    return this.Model.find({ _id: { $in: userIdArray } });
  }
}

module.exports = UserService;
