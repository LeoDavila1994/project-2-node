const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createProductsValidator = [
  body("title")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("description")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("price")
    .isDecimal()
    .withMessage("price must be a decimal")
    .notEmpty()
    .withMessage("price cannot be empty"),
  body("quantity")
    .isDecimal()
    .withMessage("quantity must be a decimal")
    .notEmpty()
    .withMessage("quantity cannot be empty"),
  checkValidations,
];

module.exports = { createUserValidators, createProductsValidator };
