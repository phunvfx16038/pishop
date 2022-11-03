const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const isAuth = require("../middleware/is-auth");

router.get("/", productController.getProducts);
router.get("/:categories", productController.getProductOnCategories);
// router.get("/product?limit", productController.getLimitProducts);
router.get("/:id", productController.getProduct);
router.post("/create", isAuth, productController.createProduct);
router.post("/update/:id", isAuth, productController.updateProduct);
router.post("/delete/:id", isAuth, productController.deleteProduct);
router.post("/deleteMany", isAuth, productController.deleteProducts);

module.exports = router;
