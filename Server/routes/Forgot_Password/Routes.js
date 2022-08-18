const express = require("express");
const route = express.Router();
const generatePassword = require("../../utils/password_generator/GeneratePassword");
const enctryptPassword = require("../../utils/encryptor/encroptor");
const { RTO } = require("../../models/user");

route.route("/generatePassword").get(async (req, res) => {
  let password = { password: generatePassword(10) };

  password.enc = await enctryptPassword(password.password);
  RTO.findOneAndUpdate(
    {
      where: {
        $and: [{ email: req.body.email }],
      },
    },
    { password: password.enc }
  ).then((resp) => {
    res.send(password);
    console.log(resp);
  });
});

module.exports = route;
