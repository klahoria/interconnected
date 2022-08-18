const Joi = require("joi");

const user = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  middle_name: Joi.string().optional(),
  rank: Joi.string().required(),
  department: Joi.string().required(),
  email: Joi.string(),
  DOJ: Joi.date().required(),
  dob: Joi.date().required(),
  current_address: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.number().required(),
  }).required(),
  alternate_adddress: Joi.object({
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.number(),
  }),
  profile_image: Joi.string(),
  permanent_address: Joi.object({
    address: Joi.string().required(),
    zip: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
  }).required(),
});

module.exports = user;
