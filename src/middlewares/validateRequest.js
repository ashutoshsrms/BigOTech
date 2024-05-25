const { check, validationResult } = require("express-validator");

const phoneRegex = /^\d{10}$/;

exports.validateCreateForm = [
  check("title").isString(),
  check("name").isString(),
  check("email").isEmail(),
  check("phoneNumber")
    .matches(phoneRegex)
    .withMessage("Invalid phone number format"),
  check("isGraduate").isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateFillData = [
  check("uniqueId").isUUID(),
  check("name").isString(),
  check("email").isEmail(),
  check("phoneNumber")
    .matches(phoneRegex)
    .withMessage("Invalid phone number format"),
  check("isGraduate").isBoolean(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
