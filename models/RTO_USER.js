const mongoose = require("mongoose");

const schema = mongoose.Schema({
  RTO_Id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  middle_name: {
    type: String,
    // required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  can_add: {
    type: String,
    enum: [0, 1, 2],
    default: 0,
    // 0 Cannot add any thing
    // 1 Can add any thing update when approved.
    // 2 add without any approval
  },
  can_update: {
    type: String,
    enum: [0, 1, 2],
    default: 0,
    // 0 Cannot edit any thing
    // 1 Can edit any thing update when approved.
    // 2 edit without any approval
  },
  can_delete: {
    type: String,
    enum: [0, 1, 2],
    // 0 Cannot delete any thing
    // 1 Can delete any thing delete when approved.
    // 2 Delete without any approval
  },
  employee_no: {
    type: String,
    required: true,
  },
  permanent_address: {
    employee_address: {
      type: String,
      required: true,
    },
    employee_zip: {
      type: String,
      minlength: 6,
      required: true,
    },
    emp_city: {
      type: String,
      required: true,
    },
    emp_state: {
      type: String,
      required: true,
    },
  },
  current_address: {
    emp_current_address: {
      type: String,
      required: true,
    },
    emp_current_zip: {
      type: String,
      minlength: 6,
      required: true,
    },
    emp_current_city: {
      type: String,
      required: true,
    },
    emp_current_state: {
      type: String,
      required: true,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const RTO_USER = mongoose.model("rto_user", schema);

module.exports = RTO_USER;
