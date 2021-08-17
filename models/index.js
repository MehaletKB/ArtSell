const User = require("./User");
const Artwork = require("./Artwork");
const Cart = require("./Cart");

// User.hasMany(Artwork, {
//   foreignKey: "artwork_id",
//   onDelete: "CASCADE",
// });

// Artwork.belongsTo(User, {
//   foreignKey: "user_id",
//   // onDelete: 'CASCADE'
// });

// User.hasOne(Cart, {
//   foreignKey: "cart_id",
// });

// Artwork.belongsTo(Cart, {
//   foreignKey: "cart_id",
// });

// Cart.hasMany(Artwork, {
//   foreignKey: "artwork_id",
//   onDelete: "CASCADE",
// });

module.exports = { User, Artwork, Cart };
