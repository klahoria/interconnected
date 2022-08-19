var express = require("express");
const validator = require("../validations/MIddleWareValidate");
var router = express.Router();
const joi = require("joi");
const user = require("../validations/userRegistration/Register");
const isLoggedIn = require("../utils/isLoggedIn/loggedIn");
const isRTO = require("../utils/MiddleWares/IsRTO");
const controllers = require("../controllers/user/user");
var checkExists = require("../utils/MiddleWares/emailExists");
const IsRTO = require("../utils/MiddleWares/IsRTO");
const upload = require("../utils/multer/multer");
const fs = require("fs");
const path = require("path");
var os = require("os");
const { RTO } = require("../models/user");

router.post(
  "/register",
  upload.single("profile_image"),
  validator(user),
  checkExists,
  controllers.register
);

router.post("/login", controllers.login);
router.post("/access_token_login", controllers.access_token_login);

router
  .route("/add_user_rto")
  .post(isLoggedIn, IsRTO, checkExists, controllers.add_user_rto);

router
  .route("/get_rto_users")
  .get(isLoggedIn, isRTO, controllers.get_rto_users);

router
  .route("/add_mail_details")
  .delete(isLoggedIn, controllers.delete_add_mail_detials)
  .put(isLoggedIn, controllers.update_add_mail_details)
  .post(isLoggedIn, isRTO, controllers.add_user_rto);

router.route("/get_mail_details").get(isLoggedIn, controllers.get_mail_details);

router.route("/images/getMyImage/:image").get((req, res) => {
  console.log("jfsdaj3fk");
  console.log(os.uptime());

  var filePath = path
    .join(__dirname, "../public/images/", req.params.image)
    .split("%20")
    .join(" ");

  // Checking if the path exists
  fs.exists(filePath, function (exists) {
    if (!exists) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });

      res.end("404 Not Found");
      return;
    }

    // Extracting file extension
    var ext = path.extname(req.params.image);
    console.log(req.params);
    // Setting default Content-Type
    var contentType = "text/plain";

    if (ext === ".png") {
      contentType = "image/png";
    }

    // Setting the headers
    res.writeHead(200, {
      "Content-Type": contentType,
    });

    // Reading the file
    fs.readFile(filePath, function (err, content) {
      // Serving the image
      res.end(content);
    });
  });
});

router
  .route("/upload_profile_image")
  .put(upload.single("profile_image"), isRTO, (req, res) => {
    console.log(req.file, req.profile_image, req.email);
    RTO.findOneAndUpdate({
      $and: [
        {
          email: req.email,
        },
        { profile_image: req.file.filename },
      ],
    }).then((resp) => {
      res.send(resp);
    });
  });

module.exports = router;
