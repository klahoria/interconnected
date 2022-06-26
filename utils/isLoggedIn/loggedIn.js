const createError = require("http-errors");
const access_token = require("../../models/acces_token");

function isLoggedIn() {
  return async function (req, res, next) {
    let token = req.headers.access_token;
    if (token) {
      access_token.findOne({ where: { access_token: token } }).then((resp) => {
        if (resp) {
          next();
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
