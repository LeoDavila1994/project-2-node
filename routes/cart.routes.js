const express = require("express");

//Controllers
const {
  addProduct,
  updateCart,
  deleteProductInCart,
  purchaseProducts,
} = require("../controllers/cart.controller");

//Middleware
const { protectSession } = require("../middlewares/auth.middlewares");
const { cartExist, checkQuantity } = require("../middlewares/cart.middleware");
const { checkProducts } = require("../middlewares/productsInCart.middleware");
const cartRouter = express.Router();

//Endpoints
cartRouter.use(protectSession);

cartRouter.post("/add-product", cartExist, checkProducts, checkQuantity, addProduct);

cartRouter.patch("/update-cart", cartExist, checkQuantity, updateCart);

cartRouter.delete("/:productId", deleteProductInCart);

cartRouter.post("/purchase", purchaseProducts);


module.exports = { cartRouter };
