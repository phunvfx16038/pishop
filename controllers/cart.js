const Cart = require("../models/cart");
const { validationResult } = require("express-validator");
exports.getCarts = (req, res) => {
  const userId = req.params.id;
  Cart.find({ "user.userId": userId })
    .then((cart) => {
      res.status(200).json(cart);
    })
    .catch((err) => console.log(err));
};

exports.createCart = (req, res) => {
  const { userId, name, cartItems, status } = req.body;
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
  const cart = new Cart({
    user: { userId, name },
    cartItems,
    status,
  });
  cart
    .save()
    .then((cartData) => {
      res.status(200).json(cartData);
    })
    .catch((err) => console.log(err));
};

exports.updateCart = (req, res) => {
  const cartId = req.body.cartId;
  const cartItems = req.body.cartItems;
  const status = req.body.status;
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }
  Cart.findOne({ _id: cartId })
    .then((cart) => {
      cart.cartItems = cartItems;
      cart.status = status;
      cart
        .save()
        .then((newCartUpdated) => {
          res.status(200).json(newCartUpdated);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
