const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  phone: {
    type: Number,
    require: true,
  },
  address: {
    type: String,
  },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("users", Users);
