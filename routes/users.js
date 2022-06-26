var express = require("express");
const validator = require("../validations/MIddleWareValidate");
var router = express.Router();
const joi = require("joi");
const user = require("../validations/userRegistration/Register");
const { RTO } = require("../models/user");
const generatePassword = require("../utils/password_generator/GeneratePassword");
const enctryptPassword = require("../utils/encryptor/encroptor");
const comparePassword = require("../utils/comparePassword/comparePass");
const generateToken = require("../utils/generateToken/GenerateToken");
const isLoggedIn = require("../utils/isLoggedIn/loggedIn");

router.post("/register", validator(user), async (req, res) => {
  let data = req.body;
  let password = generatePassword(10);
  let encrypted_password = await enctryptPassword(password);
  console.log(password, encrypted_password);
  data["password"] = encrypted_password;

  RTO.create(data)
    .then((resp) => {
      res.status(200).send({
        success: true,
        status: 200,
        message: "Congratulations You have been succesfully Registered.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/login", async (req, res) => {
  RTO.findOne({ where: { email: req.body.email } }).then(async (resp) => {
    let response = await comparePassword(req.body.password, resp.password);
    if (response) {
      let userData_to_send = resp;
      delete userData_to_send.password;
      console.log(userData_to_send);
      let token = await generateToken(
        50,
        resp.email,
        resp["_id"],
        resp["department"]
      );

      res.send({
        message: "logged In",
        token: token,
        useData: userData_to_send,
      });
    }
  });
});

router.route("/add_user_rto").post(isLoggedIn, (req, res) => {
  
  res.status(200).send({
    success: true,
    code: 200,
    message: "user has been added successfully.",
  });
});

module.exports = router;
