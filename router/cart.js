const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const isAuth = require("../middleware/is-auth");

router.get("/:id", isAuth, cartController.getCarts);
router.post("/create", isAuth, cartController.createCart);
router.post("/update", isAuth, cartController.updateCart);

module.exports = router;
