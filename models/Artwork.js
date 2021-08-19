const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Artwork extends Model {}

Artwork.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isNumeric: true,
      isDecimal: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "artwork",
  }
);

module.exports = Artwork;
