const express = require("express");

//Controllers
const {
  createProduct,
  getAllProducts,
  getProductId,
  updateProducts,
  toDisableProduct,
  createCategory,
  getAllCategories,
  updateCategory,
} = require("../controllers/products.controller");

const productRouter = express.Router();

//middlewares
const {
  createProductsValidator,
} = require("../middlewares/validators.middlewares");
const {
  protectSession,
  protectProducts,
} = require("../middlewares/auth.middlewares");
const { productExist } = require("../middlewares/product.middleware");

//utils
const { upload } = require("../utils/multer.utils");

//Endpoints
productRouter.get("/categories", getAllCategories);

productRouter.get("/:id", getProductId);

productRouter.get("/", getAllProducts);

productRouter.use(protectSession);

productRouter.post("/categories", createCategory);

productRouter.patch("/categories/:id", updateCategory);

productRouter.post("/", upload.single("postImg"), createProduct);

productRouter.patch("/:id", productExist, protectProducts, updateProducts);

productRouter.delete("/:id", productExist, protectProducts, toDisableProduct);

module.exports = { productRouter };
