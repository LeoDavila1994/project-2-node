//Models
const { ProductsInCarts } = require("../models/productsInCar.model");
const { Carts } = require("../models/carts.model");
const { Products } = require("../models/products.model");
const { Orders } = require("../models/orders.model");
//Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const addProduct = catchAsync(async (req, res, next) => {
  const { productsInCart, cart } = req;
  const { productId, quantity } = req.body;

  if (!productsInCart) {
    const product = await ProductsInCarts.create({
      productId,
      quantity,
      cartId: cart.userId,
    });

    res.status(201).json({
      status: "success",
      data: { product },
    });
  } else {
    res.status(201).json({
      status: "success",
      data: { productsInCart },
    });
  }
});

const updateCart = catchAsync(async (req, res, next) => {

  const { sessionUser } = req;
  const { productId, quantity } = req.body;

  const userProducts = await ProductsInCarts.findOne({
    where: { cartId: sessionUser.id, productId: productId },
  });

  if (quantity === 0) {
    await userProducts.update({ quantity: quantity, status: "removed" });
  } else {
    await userProducts.update({ quantity: quantity, status: "active" });
  }

  res.status(201).json({
    status: "success",
    data: { userProducts },
  });
});

const deleteProductInCart = catchAsync(async (req, res, next) => {

  const { productId } = req.params;
  const { sessionUser } = req;

  const deleteProductsInCart = await ProductsInCarts.findOne({
    where: { cartId: sessionUser.id, productId: productId },
  });

  if (!deleteProductsInCart) {
    return next(new AppError("this product is not added to you cart", 404));
  }

  await deleteProductsInCart.update({ status: "removed", quantity: 0 });

  res.status(201).json({
    status: "success",
    data: { deleteProductsInCart },
  });
});

const purchaseProducts = catchAsync(async (req, res, next) => {
  
  const { sessionUser } = req;
  let price = 0;

  const listProducts = await ProductsInCarts.findAll({
    where: { cartId: sessionUser.id, status: "active" },
  });

  listProducts.map(async (prod) => {
    const purchasedProduct = await Products.findOne({
      where: { id: prod.productId },
    });

    const toDiscountProduct = (purchasedProduct.quantity -= prod.quantity);
    const priceProduct = purchasedProduct.price * prod.quantity;

    price += priceProduct;

    await purchasedProduct.update({ quantity: toDiscountProduct });

    await prod.update({ status: "purchased" });
  });

  const cartUser = await Carts.findOne({
    where: { userId: sessionUser.id, status: "active" },
  });

  if (!cartUser) {
    return next(new AppError("You don't have a shopping cart", 404));
  }

  await cartUser.update({ status: "purchased" });

  await Orders.create({
    userId: sessionUser.id,
    cartId: cartUser.id,
    totalPrice: price,
  });

  res.status(201).json({
    status: "success",
    data: { cartUser, listProducts },
  });
});



module.exports = {
  addProduct,
  updateCart,
  deleteProductInCart,
  purchaseProducts,
};
