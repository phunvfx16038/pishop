const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Orders = new Schema(
  {
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
    orderItems: [],
    totalPrice: {
      type: Number,
      required: true,
      default: true,
    },
    address:{
      type:String,
    },
    status: {
      type: String,
      require: true,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("orders", Orders);
