const { default: mongoose } = require("mongoose");

const mailCollection = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  dept_id: {
    type: String,
    required: true,
  },
  default: {
    type: Boolean,
    required: false,
    default: false,
    // unique: true,
  },
  is_deleted: {
    type: Boolean,
    default: 0,
  },
});

const mailer_details = mongoose.model("mailer_details", mailCollection);

module.exports = mailer_details;
