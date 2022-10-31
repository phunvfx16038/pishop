const express = require("express");
const router = express.Router();
const orderRouter = require("../controllers/order");
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, orderRouter.getOrders);
router.get("/orderUser/:userId", isAuth, orderRouter.getOrderUser);
router.post("/create", isAuth, orderRouter.createOrder);

module.exports = router;
