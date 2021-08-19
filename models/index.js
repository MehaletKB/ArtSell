const User = require("./User");
const Artwork = require("./Artwork");
const Cart = require("./Cart");

Artwork.belongsToMany(User, {
  foreignKey: "artworkId",
  through: Cart,
});

User.belongsToMany(Artwork, {
  foreignKey: "userId",
  through: Cart,
});

module.exports = { User, Artwork, Cart };
