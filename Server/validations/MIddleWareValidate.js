//* middlewares/Validator.js
const createHttpError = require("http-errors");
//* Include joi to check error type
const Joi = require("joi");
//* Include all validators
// const Validators = require("../validators");

module.exports = function (validator) {
  //! If validator is not exist, throw err
  //   if (!Validators.hasOwnProperty(validator))
  //     throw new Error(`'${validator}' validator is not exist`);

  return async function (req, res, next) {
    try {
      const validated = await validator.validateAsync(req.body);
      req.body = DataNormalizer(validated);
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
      if (err.isJoi)
        return next(createHttpError(422, { message: err.message }));
      next(createHttpError(500));
    }
  };
};

function DataNormalizer(data) {
  try {
    if (Array(data).isArray) {
      return data.map((item) => {
        return DataNormalizer(item);
      });
    }
    if (typeof data == "object" && data !== null) {
      Object.keys(data).map((item) => {
        if (Array(data[item]).isArray) {
          data[item].map((item) => {
            return DataNormalizer(data[item]);
          });
        } else if (typeof data[item] == "object" && data[item] !== null) {
          return DataNormalizer(data[item]);
        } else {
          if (typeof data[item] == "string") {
            data[item] = data[item].trim();
          }
          return;
        }
      });
      return data;
    }
    return data.trim();
  } catch (error) {
    console.log(error);
  }
}
