const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");
const authValidator = require("../validate/authValidator");

router.post("/register", authValidator, authController.postRegister);

router.post("/login", authController.postLogin);

router.post("/reset", authController.postResetPassword);

router.post("/new-password", authController.postUpdateResetPassword);

router.post("/updatePassword", isAuth, authController.UpdateUserPassword);

router.post("/updatePasswordbyUser", isAuth, authController.UpdatePassword);

module.exports = router;
