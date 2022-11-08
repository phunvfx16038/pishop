const { body } = require("express-validator");

module.exports = [
  body("title").trim().notEmpty().withMessage("Missing title"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Missing price")
    .isNumeric()
    .withMessage("Price must be number"),
  body("description").trim().notEmpty().withMessage("Missing description"),
  body("categories").trim().notEmpty().withMessage("Misisng categories"),
  body("thumbnail").trim().notEmpty().withMessage("Missing thumbnail"),
];
