// Models
const { User } = require("./user.model");
const { Carts } = require("./carts.model");
const { Orders } = require("./orders.model");
const { Products } = require("./products.model");
const { Categories } = require("./categories.model");
const { ProductImgs } = require("./productImgs.model");
const { ProductsInCarts } = require("./productsInCar.model");

const initModels = () => {};

User.hasMany(Orders, { foreignKey: "userId" });
Orders.belongsTo(User);

User.hasOne(Carts, { foreignKey: "userId" });
Carts.belongsTo(User);

User.hasMany(Products, { foreignKey: "userId" });
Products.belongsTo(User);

Carts.hasOne(Orders, { foreignKey: "cartId" });
Orders.belongsTo(Carts);

Categories.hasOne(Products, { foreignKey: "categoryId" });
Products.belongsTo(Categories);

Products.hasOne(ProductsInCarts, { foreignKey: "productId" });
ProductsInCarts.belongsTo(Products);

Carts.hasMany(ProductsInCarts, { foreignKey: "cartId" });
ProductsInCarts.belongsTo(Carts);

Products.hasMany(ProductImgs, { foreignKey: "productId" });
ProductImgs.belongsTo(Products);

module.exports = { initModels };
