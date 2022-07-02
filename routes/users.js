var express = require("express");
const validator = require("../validations/MIddleWareValidate");
var router = express.Router();
const joi = require("joi");
const user = require("../validations/userRegistration/Register");
const { RTO } = require("../models/user");
const RTO_USER = require("../models/RTO_USER");
const generatePassword = require("../utils/password_generator/GeneratePassword");
const enctryptPassword = require("../utils/encryptor/encroptor");
const comparePassword = require("../utils/comparePassword/comparePass");
const generateToken = require("../utils/generateToken/GenerateToken");
const isLoggedIn = require("../utils/isLoggedIn/loggedIn");
const isRTO = require("../utils/MiddleWares/IsRTO");
const mailer_details = require("../models/mailer_config");

router.post("/register", validator(user), async (req, res) => {
  let data = req.body;
  let password = generatePassword(10);
  let encrypted_password = await enctryptPassword(password);
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
      userData_to_send.password = "";
      delete userData_to_send.password;
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
  RTO.findOne({ where: { email: req.email } }).then((resp) => {
    if (resp) {
      RTO_USER.create(req.body)
        .then((resp) => {
          if (resp) {
            res.status(200).send({
              message: "user has been successfully added.",
              success: true,
              code: 200,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    } else {
      res.status(500).send({
        message: "invalid token or Unauthorized.",
        err: 401,
        success: false,
      });
    }
  });
});

router.route("/get_rto_users").get(isLoggedIn, isRTO, (req, res) => {
  RTO_USER.find(
    {
      where: {
        _id: req.rto_id,
      },
    },
    { password: 0 }
  ).then((resp) => {
    res.status(200).send({
      message: "successfuly fetched the rto user list",
      data: resp,
      code: 200,
      success: true,
    });
  });
});

function createMailerData(body) {
  return mailer_details.create(body).then((resp) => {
    if (resp) {
      return "UserCreated Successfully.";
    }
  });
}

function findAndUpdate(body) {
  return mailer_details.findOneAndUpdate(
    {
      dept_id: body.dept_id,
      default: true,
    },
    { default: false }
  );
}

router
  .route("/add_mail_details")
  .delete(isLoggedIn, (req, res) => {
    mailer_details
      .findOneAndUpdate(
        {
          _id: req.body.id,
        },
        { is_deleted: 1 }
      )
      .then((resp) => {
        console.log(resp);
        res.status(204).end();
      });
  })
  .put(isLoggedIn, (req, res) => {
    let body = { dept_id: req.dept_id };
    findAndUpdate(body).then((resp) => {
      mailer_details
        .findByIdAndUpdate({ _id: req.body.id }, req.body.update)
        .then((resp) => {
          res.status(201).end();
          console.log(resp);
        });
    });
  })
  .post(isLoggedIn, async (req, res) => {
    try {
      let body = {
        username: req.body.username,
        password: req.body.password,
        department: req.department,
        dept_id: req.rto_id,
        default: req?.body?.default,
      };
      if (body.default !== undefined) {
        findAndUpdate(body).then(async (resp) => {
          console.log(resp, ";;;;;;;;;");
          if (resp == null || resp) {
            let data = await createMailerData(body);
            if (data) {
              res.status(200).send({ message: data, success: true, code: 200 });
            }
          }
        });
      } else {
        let data = await createMailerData(body);
        if (data) {
          res.status(200).send({ message: data, success: true, code: 200 });
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

router.route("/get_mail_details").get(isLoggedIn, (req, res) => {
  mailer_details
    .find({
      $and: [
        { is_deleted: false },
        { dept_id: req.rto_id },
        { department: req.department },
      ],
    })
    .then((resp) => {
      let data = resp.map((item) => {
        return {
          id: item._id,
          username: item.username,
          password: item.password,
          default: item.default,
          // is_deleted: item.is_deleted,
        };
      });
      res.status(200).send({
        data: data,
        message: "success",
        success: true,
      });
    });
});

module.exports = router;
