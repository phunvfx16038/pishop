const express = require("express");
const router = express.Router();
const orderRouter = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, orderRouter.getOrders);
router.get("/orderUder", isAuth, orderRouter.getOrderUser);
router.get("/detail", isAuth, orderRouter.getOrderUserDetail);
router.post("/create", isAuth, orderRouter.createOrder);

module.exports = router;
