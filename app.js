const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const cors = require("cors");
const productData = require("./data/product");
const userData = require("./data/users");
const orderData = require("./data/orders");
const userRouter = require("./router/user");
const authRouter = require("./router/auth");
const productRouter = require("./router/product");
const orderRouter = require("./router/order");
const cartRouter = require("./router/cart");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const MONGO_URI =
  "mongodb+srv://vanphu:Conheocon16@cluster0.qmmk4.mongodb.net/shopOnline?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "https://pishopadmin.netlify.app",
      "http://localhost:3000",
      "https://pishop.netlify.app",
    ],
  })
);

app.use((req, res, next) => {
  if (!req.user) {
    return next();
  }
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      return next();
    })
    .catch((err) => console.log(err));
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/cart", cartRouter);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Product.findOne().then(async (product) => {
      if (!product) {
        await Product.insertMany(productData.products);
      }
    });
    User.findOne().then(async (user) => {
      if (!user) {
        await User.insertMany(userData.users);
      }
    });
    Order.findOne().then(async (order) => {
      if (!order) {
        await Order.insertMany(orderData.orders);
      }
    });
    app.listen(PORT);
  })
  .catch((err) => console.log(err));
