// const Joi = require("joi");
const mongoose = require("mongoose");

const user = mongoose.Schema({
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
  rank: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  DOJ: {
    type: Date,
    required: false,
  },
  dob: {
    type: Date,
    required: true,
  },
  current_address: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  alternate_adddress: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
  },
  profile_image: {
    type: String,
    required: false,
  },
  permanent_address: {
    address: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
});

const model = mongoose.model("police", user);
const hospital = mongoose.model("hospital", user);
const RTO = mongoose.model("RTO", user);
const bank = mongoose.model("bank", user);

module.exports = model;
module.exports = { hospital, RTO, bank };
