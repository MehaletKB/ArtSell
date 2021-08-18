const User = require("./User");
const Artwork = require("./Artwork");

Artwork.belongsTo(User, {
  foreignKey: "user_id",
  // onDelete: 'CASCADE'
});

module.exports = { User, Artwork };
