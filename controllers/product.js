const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  const productLimit = req.query.limit || 0;
  Product.find()
    .limit(productLimit)
    .then((products) => {
      if (!products) {
        res.status(404).json("Chưa có sản phẩm nào!");
      }
      res.status(200).json(products);
    })
    .catch((err) => res.status(404).json(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        res.status(401).json("Sản phẩm này hiện không có!");
      }
      res.status(200).json(product);
    })
    .catch((err) => res.status(404).json(err));
};

exports.getProductOnCategories = (req, res) => {
  const categories = req.params.categories;
  Product.find({ categories: categories })
    .then((product) => {
      if (!product) {
        res.status(401).json("Sản phẩm này hiện không có!");
      }
      res.status(200).json(product);
    })
    .catch((err) => res.status(404).json(err));
};

exports.createProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  const categories = req.body.categories;
  const material = req.body.material;
  const tutorial = req.body.tutorial;
  const thumbnail = req.body.thumbnail;

  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    return res.status(401).json("Bạn không có quyền tạo sản phẩm!");
  }
  const newProduct = new Product({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
    categories: categories,
    material: material,
    tutorial: tutorial,
    thumbnail: thumbnail,
  });
  newProduct
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => res.status(404).json(err));
};

exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const isAdmin = req.user.isAdmin;

  if (!isAdmin) {
    return res.status(401).json("Bạn không có quyền cập nhật sản phẩm này!");
  }
  Product.findByIdAndUpdate(
    productId,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => res.status(404).json(err));
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.params.id;
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    return res.status(401).json("Bạn không có quyền xóa sản phẩm này!");
  }
  Product.findByIdAndDelete(productId)
    .then((result) => {
      res.status(200).json("Sản phẩm đã được xóa!");
    })
    .catch((err) => res.status(404).json(err));
};
