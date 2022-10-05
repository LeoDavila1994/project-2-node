const express = require("express");

// Controllers
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
  getProducts,
  getOrdersUser,
  getOrderById,
} = require("../controllers/users.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {
  protectSession,
  protectUsersAccount,
//   protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const usersRouter = express.Router();

usersRouter.post("/", createUserValidators, createUser);

usersRouter.post("/login", login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.get("/", getAllUsers);

usersRouter.get("/me", getProducts);

usersRouter.get("/orders", getOrdersUser);

usersRouter.get("/orders/:id", getOrderById);

usersRouter.patch("/:id", userExists, protectUsersAccount, updateUser);

usersRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };
