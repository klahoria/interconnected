const RTO_USER = require("../../models/RTO_USER");
const { RTO } = require("../../models/user");

function checkExists() {
  return async (req, res, next) => {
    try {
      let rto = await RTO.findOne({ $and: [{ email: req.body.email }] });
      if (rto) {
        console.log(rto);
        res.status(400).send({
          message: "Email already exist's",
          err: true,
          success: false,
        });
        return;
      } else {
        RTO_USER.findOne({ $and: [{ email: req.body.email }] });
        if (rto) {
          console.log(rto);
          res.status(400).send({
            message: "Email already exist's",
            err: true,
            success: false,
          });
          return;
        } else {
          next();
        }
      }
    } catch (error) {
      if (error) {
        console.log(error);
        res.status(401).send({
          message: "unAuthorised or Invalid Token",
          success: false,
          code: 401,
        });
      }
    }
  };
}

module.exports = checkExists();
