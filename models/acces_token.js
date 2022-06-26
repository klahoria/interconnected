const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

let schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const access_token = mongoose.model("access_token", schema);

module.exports = access_token;
