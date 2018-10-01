const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channel = new Schema({
  name: { type: String, required: true },
  usersInChannel: { type: Array, default: [] }
});

module.exports = mongoose.model("channel", channel);
