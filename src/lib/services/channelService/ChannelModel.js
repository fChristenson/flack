const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channel = new Schema({
  name: { type: String, required: true },
  fingerprint: { type: String, required: true },
  usersInChannel: { type: Array, default: [] },
  type: { type: String, enum: ["channel", "directMessage"], required: true }
});

module.exports = mongoose.model("channel", channel);
