const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Cart extends Model {}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    artworkId: {
      type: DataTypes.INTEGER,
      references: {
        model: "artwork",
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "cart",
  }
);

module.exports = Cart;
