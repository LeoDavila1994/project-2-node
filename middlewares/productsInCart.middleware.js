const { ProductsInCarts } = require("../models/productsInCar.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const checkProducts = catchAsync(async (req, res, next) => {

  const { sessionUser } = req;
  const { productId, quantity } = req.body;

  const productsInCart = await ProductsInCarts.findOne({
    where: { cartId: sessionUser.id, productId: productId },
  });
  
  if (productsInCart) {
    if (productsInCart.status === "active") {
      return next(new AppError("this product already exist in your cart", 404));
    } else {
      await productsInCart.update({ quantity, status: "active" });
    }
  }

  req.productsInCart = productsInCart;
  next();

});

module.exports = {
  checkProducts,
};
