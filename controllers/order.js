const Order = require("../models/order");

exports.getOrders = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    res.status(404).json("Bạn không có quyền truy cập vào orders này!");
  }
  Order.find()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrderUser = (req, res, next) => {
  const userId = req.user._id;
  Order.find({ "user.userId": userId })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => console.log(err));
};

exports.getOrderUserDetail = (req, res, next) => {
  const orderId = req.params.orderId;
  const userId = req.params._id;

  Order.find({ "user.userId": userId, _id: orderId })
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((err) => console.log(err));
};

exports.createOrder = (req, res, next) => {
  const userId = req.body.user.userId;
  const name = req.body.user.name;
  const { totalPrice, orderItems, address, status } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("Chưa có orders.");
  } else {
    const order = new Order({
      user: { userId, name },
      orderItems,
      totalPrice,
      address,
      status,
    });
    order
      .save()
      .then((order) => {
        res.status(200).json(order);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.updateOrder = (req, res) => {
  const orderId = req.body.orderId;
  const { totalPrice, orderItems, address, status, user } = req.body;
  Order.findOne({ _id: orderId })
    .then((order) => {
      order.user = user;
      order.status = status;
      order.totalPrice = totalPrice;
      order.orderItems = orderItems;
      order.address = address;
      order
        .save()
        .then((newOrderUpdated) => {
          res.status(200).json(newOrderUpdated);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
