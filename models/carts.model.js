const { db, DataTypes } = require("../utils/database.util");

const Carts = db.define("carts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

module.exports = { Carts };
