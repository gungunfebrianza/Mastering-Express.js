const mongoose = require("mongoose");
const schema = mongoose.Schema;

//create schema
const UserSchema = new schema({
  name: {
    type: string,
    required: true
  },
  email: {
    type: string,
    required: true
  },
  password: {
    type: string,
    required: true
  },
  avatar: {
    type: string
  },
  date: {
    type: Date,
    required: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
