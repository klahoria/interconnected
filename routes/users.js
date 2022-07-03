var express = require("express");
const validator = require("../validations/MIddleWareValidate");
var router = express.Router();
const joi = require("joi");
const user = require("../validations/userRegistration/Register");
const isLoggedIn = require("../utils/isLoggedIn/loggedIn");
const isRTO = require("../utils/MiddleWares/IsRTO");
const controllers = require("../controllers/user/user");

router.post("/register", validator(user), controllers.register);

router.post("/login", controllers.login);

router.route("/add_user_rto").post(isLoggedIn, controllers.add_user_rto);

router
  .route("/get_rto_users")
  .get(isLoggedIn, isRTO, controllers.get_rto_users);

router
  .route("/add_mail_details")
  .delete(isLoggedIn, controllers.delete_add_mail_detials)
  .put(isLoggedIn, controllers.update_add_mail_details)
  .post(isLoggedIn, isRTO, controllers.add_user_rto);

router.route("/get_mail_details").get(isLoggedIn, controllers.get_mail_details);

module.exports = router;
