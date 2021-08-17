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

/**
 * // constrollesr/cart.js
 * roter.post("/add", ({body }, res) => {
 *  // Either create a new cart for this userId and add the
 * // artwork.
 * TODO: findOne cart where userId is the body.userId
 * // UYpdate order and push the body.artworkId
 *
 * })
 *
 * router.get("/checkout",
 * // Reduce to toal up all of the prices for STripe
 * // await stripe processing
 * // update the user with the new artwork purchaes
 * )
 */
