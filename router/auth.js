const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

router.post("/register", authController.postRegister);

router.post("/login", authController.postLogin);

router.post("/reset", authController.postResetPassword);

router.post("/new-password", authController.postUpdateResetPassword);

router.post("/updatePassword", isAuth, authController.UpdateUserPassword);
module.exports = router;
