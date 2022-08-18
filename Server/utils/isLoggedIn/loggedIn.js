const createError = require("http-errors");
const access_token = require("../../models/acces_token");
const { RTO } = require("../../models/user");

function isLoggedIn() {
  return async function (req, res, next) {
    let token = req.headers.access_token;
    if (token) {
      access_token.findOne({ where: { access_token: token } }).then((resp) => {
        if (resp) {
          if (resp.department == "RTO") {
            RTO.findOne({ where: { _id: resp.id } }).then((response) => {
              if (response) {
                req.email = response.email;
                req.rank = response.rank;
                req.department = response.department;
                req.rto_id = response._id.toString();
                next();
              } else {
                return res
                  .status(401)
                  .send({ error: 401, message: "Unauthorized" });
              }
            });
          }
        } else {
          return res.status(401).send({ error: 401, message: "Unauthorized" });
        }
      });
    } else {
      return res.status(401).send({ error: 401, message: "Unauthorized" });
    }
  };
}

module.exports = isLoggedIn();
