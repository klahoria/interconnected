const bcrypt = require("bcrypt");

function comparePassword(password, hash) {
  let pass = bcrypt.compare(password, hash);
  return pass;
}

module.exports = comparePassword;
