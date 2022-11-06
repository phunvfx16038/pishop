const Orders = require("../models/order");

exports.getOrders = (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    res.status(400).json("Bạn không có quyền truy cập vào orders này!");
  }
  Orders.find()
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrderUser = (req, res, next) => {
  const userId = req.params.userId;

  Orders.find({ "user.userId": userId })
    .then((orders) => {
      res.status(200).json(orders);
    })
    .catch((err) => console.log(err));
};

exports.getOrder = (req, res) => {
  const orderId = req.params.orderId;
  Orders.findOne({ _id: orderId })
    .then((order) => {
      if (!order) {
        return res.status(400).json("Không tìm thấy đơn hàng!");
      }
      return res.status(200).json(order);
    })
    .catch((err) => console.log(err));
};

exports.createOrder = (req, res, next) => {
  const { user, purchase_units, status } = req.body;
  const order = new Orders({
    user,
    purchase_units,
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
};

exports.updateOrder = (req, res) => {
  const orderId = req.body.orderId;
  const { totalPrice, orderItems, address, status, user } = req.body;
  Orders.findOne({ _id: orderId })
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
