const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Products = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tutorial: [],
  thumbnail: {
    type: String,
    required: true,
  },
  imageUrl: [],
  size: [],
  categories: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("products", Products);
