const access_token = require("../../models/acces_token");
function generateToken(length, email, id, department) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return access_token
    .create({
      email: email,
      id: id,
      access_token: result,
      department,
    })
    .then((resp) => {
      return result;
    });
}

// console.log(makeid(5));

module.exports = generateToken;
