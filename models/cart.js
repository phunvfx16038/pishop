const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    required: true,
  },
  cartItems: [],
});

module.exports = mongoose.model("cart", Cart);
