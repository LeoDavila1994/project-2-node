// Models
const { Products } = require("../models/products.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const productExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Products.findOne({
    where: { id },
  });

  // If product doesn't exist, send error message
  if (!product) {
    return next(new AppError("product not found", 404));
  }

  // req.anyPropName = 'anyValue'
  req.product = product;
  next();
});


module.exports = {
  productExist,
};
