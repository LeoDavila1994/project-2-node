const { db, DataTypes } = require("../utils/database.util");

const Categories = db.define("categories", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "active",
  },
});

module.exports = { Categories };
