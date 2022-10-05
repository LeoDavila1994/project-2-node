const { db, DataTypes } = require("../utils/database.util");

const ProductsInCarts = db.define("productsInCarts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

module.exports = { ProductsInCarts };
