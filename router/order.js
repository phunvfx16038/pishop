const express = require("express");
const router = express.Router();
const orderRouter = require("../controllers/order");
const isAuth = require("../middleware/is-auth");
const orderValidator = require("../validate/orderValidator");

router.get("/", isAuth, orderRouter.getOrders);
router.get("/:orderId", isAuth, orderRouter.getOrder);
router.get("/orderUser/:userId", isAuth, orderRouter.getOrderUser);
router.post("/create", isAuth, orderValidator, orderRouter.createOrder);

module.exports = router;
