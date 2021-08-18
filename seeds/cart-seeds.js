const { Cart } = require("../models");

const cartData = [
  {
    userId: 1,
    artworkId: 1,
  },
  {
    userId: 1,
    artworkId: 3,
  },
  {
    userId: 2,
    artworkId: 2,
  },
  {
    userId: 3,
    artworkId: 4,
  },
  {
    userId: 3,
    artworkId: 5,
  },
];

const seedCarts = () => Cart.bulkCreate(cartData);

module.exports = seedCarts;
