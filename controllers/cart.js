const Cart = require("../models/cart");

exports.getCarts = (req, res) => {
  const userId = req.params.id;
  Cart.find({ "user.userId": userId })
    .then((cart) => {
      res.status(200).json(cart);
    })
    .catch((err) => console.log(err));
};

exports.createCart = (req, res) => {
  const { user, cartItems, status } = req.body;
  const cart = new Cart({
    user,
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
