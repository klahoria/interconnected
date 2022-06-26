const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

let schema = mongoose.Schema({
  ip_address: {
    type: String,
    required: true,
  },
  headers: {
    type: Object,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  },
  call_time: {
    type: Date,
    required: true,
  },
  time_elapsed: {
    type: String,
    required: false,
  },
  user_token: {
    type: String,
    required: false,
    default: null,
  },
  user_type: {
    type: String,
    required: false,
  },
  logged_in: {
    type: Boolean,
    default: false,
  },
  user_rank: {
    type: String,
    required: false,
  },
  body: {
    type: Object,
    required: false,
    default: null,
  },
  query: {
    type: Object,
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const user = mongoose.model("user_log", schema);

module.exports = user;
