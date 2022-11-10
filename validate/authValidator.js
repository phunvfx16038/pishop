const { body } = require("express-validator");
const User = require("../models/user.js");

module.exports = [
  body("userName").trim().notEmpty().withMessage("Missing UserName"),
  body("password").trim().notEmpty().withMessage("Missing Password"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Misisng email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email đã tồn tại. Vui lòng chọn Email khác.");
        }
      });
    }),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Missing phone number")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
];
