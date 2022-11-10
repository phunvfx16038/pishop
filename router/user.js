const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/user");
const isAuth = require("../middleware/is-auth");
const authValidator = require("../validate/authValidator");

router.get("/", isAuth, userRouter.getUsers);
router.get("/:id", isAuth, userRouter.getUser);
router.post("/update/:id", isAuth, userRouter.postUpdateUser);
router.post("/delete/:id", isAuth, userRouter.deleteUser);
router.post("/deleteMany", isAuth, userRouter.deleteUsers);

module.exports = router;
