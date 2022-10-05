const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Models
const { Carts } = require("../models/carts.model");
const { User } = require("../models/user.model");
const { Orders } = require("../models/orders.model");
const { Products } = require("../models/products.model");
const { ProductsInCarts } = require("../models/productsInCar.model");
// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

dotenv.config({ path: "./config.env" });

// Gen random jwt signs
// require('crypto').randomBytes(64).toString('hex') -> Enter into the node console and paste the command

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { users },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role !== "admin" && role !== "normal") {
    return next(new AppError("Invalid role", 400));
  }

  // Encrypt the password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  // 201 -> Success and a resource has been created
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;
  await user.update({ name, email });

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: "deleted" });

  res.status(204).json({ status: "success" });
});

const login = catchAsync(async (req, res, next) => {
  // Get email and password from req.body
  const { email, password } = req.body;

  // Validate if the user exist with given email
  const user = await User.findOne({
    where: { email, status: "active" },
  });

  // Compare passwords (entered password vs db password)
  // If user doesn't exists or passwords doesn't match, send error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Wrong credentials", 400));
  }

  // Remove password from response
  user.password = undefined;

  // Generate JWT (payload, secretOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});

const getOrdersUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const userOrders = await Orders.findAll({
    where: { userId: sessionUser.id },
    include: {
      model: Carts,
      include: { model: ProductsInCarts },
    },
  });

  res.status(201).json({
    status: "success",
    data: { userOrders },
  });
});

const getProducts = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const products = await Products.findAll({
    where: { userId: sessionUser.id },
  });
  res.status(201).json({
    status: "success",
    data: { products },
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const userOrders = await Orders.findAll({
    where: { userId: sessionUser.id, id: id },
  });

  if (!userOrders) {
    return next(
      new AppError("This user don't have an order with this id", 400)
    );
  }

  res.status(201).json({
    status: "success",
    data: { userOrders },
  });
});

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  getOrdersUser,
  getProducts,
  getOrderById,
};
