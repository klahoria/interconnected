const generateToken = require("../../utils/generateToken/GenerateToken");
const generatePassword = require("../../utils/password_generator/GeneratePassword");
const enctryptPassword = require("../../utils/encryptor/encroptor");
const comparePassword = require("../../utils/comparePassword/comparePass");
const { RTO } = require("../../models/user");
const RTO_USER = require("../../models/RTO_USER");
const mailer_details = require("../../models/mailer_config");
var os = require("os");

const controllers = {
  register: async (req, res) => {
    // console.log(req.file);
    let data = req.body;
    let password = generatePassword(10);
    console.log(password);
    let encrypted_password = await enctryptPassword(password);
    data["password"] = encrypted_password;
    data["profile_image"] =
      req.protocol +
      "://" +
      req.hostname +
      "/users/images/getMyImage/" +
      req.file.filename;
    // console.log(os.networkInterfaces());
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
  },

  login: async (req, res) => {
    try {
      RTO.findOne({
        $and: [{ email: req.body.email }],
      })
        .then(async (resp) => {
          if (resp) {
            let response = await comparePassword(
              req.body.password,
              resp.password
            );
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
                status: "success",
                message: "User logged in successfully",
                title: "Success",
                data: userData_to_send,
                token: token,
              });
            } else {
              res.status(400).send({
                status: "error",
                message: "Username and password not matched",
                title: "!Error",
              });
            }
          } else {
            res.status(400).send({
              status: "error",
              message: "Username and password not matched",
              title: "!Error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  },

  add_user_rto: async (req, res) => {
    let body = req.body;
    let password = generatePassword(10);
    let encrypted_password = await enctryptPassword(password);
    body.password = encrypted_password;
    body.RTO_ID = req.rto_id;
    RTO.findOne({ where: { email: body.email } }).then((resp) => {
      if (resp) {
        res.status(500).send({
          message: "Email already exists with another user.",
          err: 401,
          success: false,
        });
      } else {
        RTO_USER.create(body)
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
            res.send({
              err: err.toString(),
              success: false,
              message: "Email already exists.",
            });
          });
      }
    });
  },

  get_rto_users: (req, res) => {
    RTO_USER.find({
      $and: [
        {
          RTO_ID: req.rto_id,
        },
        { is_deleted: 0 },
      ],
    }).then((resp) => {
      res.status(200).send({
        message: "successfuly fetched the rto user list",
        data: resp,
        code: 200,
        success: true,
      });
    });
  },

  delete_add_mail_detials: (req, res) => {
    mailer_details
      .findOneAndUpdate(
        {
          _id: req.body.id,
        },
        { is_deleted: 1 }
      )
      .then((resp) => {
        res.status(204).end();
      });
  },

  update_add_mail_details: (req, res) => {
    let body = { dept_id: req.dept_id };
    findAndUpdate(body).then((resp) => {
      mailer_details
        .findByIdAndUpdate({ _id: req.body.id }, req.body.update)
        .then((resp) => {
          res.status(201).end();
        });
    });
  },

  add_mail_details: async (req, res) => {
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
  },

  get_mail_details: (req, res) => {
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
  },
};

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

module.exports = controllers;
