const { RTO } = require("../../models/user");

function IsRTO() {
  return async (req, res, next) => {
    try {
      let rto = await RTO.findOne({ where: { email: req.email } });
      if (rto) {
        req.rto_id = rto._id.toString();
        next();
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

module.exports = IsRTO();
