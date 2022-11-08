const { body } = require("express-validator");

module.exports = [
  body("userName").trim().notEmpty().withMessage("Missing userName"),
  body("password").trim().notEmpty().withMessage("Missing password"),
  body("name").trim().notEmpty().withMessage("Missing name"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Misisng email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Missing phone number")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];
