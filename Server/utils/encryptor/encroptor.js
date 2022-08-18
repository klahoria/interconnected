const bcrypt = require("bcrypt");

function encryptPassword(password) {
  let encrypted_password = bcrypt.hash(password, process.env.salt_rounds || 10);
  return encrypted_password;
}


module.exports = encryptPassword;
