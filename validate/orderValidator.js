const { body } = require("express-validator");

module.exports = [
  body("status").trim().notEmpty().withMessage("Missing status"),
  body("userId").trim().notEmpty().withMessage("Missing userId"),
  body("name").trim().notEmpty().withMessage("Misisng name"),
];
