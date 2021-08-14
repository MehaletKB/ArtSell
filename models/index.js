const User = require('./User');
const Artwork = require('./Artwork');

User.hasMany(Artwork, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Artwork.belongsTo(User, {
  foreignKey: 'user_id',
  // onDelete: 'CASCADE'
});


module.exports = { User, Artwork };
