const User = require('./User');
const Artwork = require('./Artwork');

const Purchases = sequelize.define('Purchases', {
  is_Owened: DataTypes.BOOLEAN,
  view_Counts: DataTypes.NUMBER,
  first_View: DataTypes.DATE,
  last_View: DataTypes.DATE,
  is_In_Cart: DataTypes.BOOLEAN,

})

User.belongsToMany(Artwork, { through: Purchases });

Artwork.belongsToMany(User, { through: Purchases });



