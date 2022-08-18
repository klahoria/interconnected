const mongoose = require("mongoose");

const schema = mongoose.Schema({
  RTO_ID: {
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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  occupation: {
    type: String,
    required: true,
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
  can_add: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 3,
    // 0 Cannot add any thing
    // 1 Can add any thing update when approved.
    // 2 add without any approval
    // 3 cannot do anything1
  },
  can_update: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 3,
    // 0 Cannot edit any thing
    // 1 Can edit any thing update when approved.
    // 2 edit without any approval
    // 3 cannot do anything
  },
  can_delete: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 3,
    // 0 Cannot delete any thing
    // 1 Can delete any thing delete when approved.
    // 2 Delete without any approval
    // 3 cannot do anything
  },
  can_view: {
    type: Number,
    Enum: [0, 1, 2, 3],
    default: 3,
    // 0 no permission
    // 1 can directly add user
    // 2 User added will be reviewed add user
  },
  is_deleted: {
    type: Number,
    Enum: [0, 1],
    default: 0,
  },
  is_verified: {
    type: Number,
    Enum: [0, 1],
    default: 0,
  },
  is_blocked: {
    type: Number,
    Enum: [0, 1],
    default: 0,
  },
  is_restricred: {
    type: Number,
    Enum: [0, 1],
    default: 0,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const RTO_USER = mongoose.model("rto_user", schema);

module.exports = RTO_USER;
