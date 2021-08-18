const seedArtworks = require("./artwork-seeds");
const seedUsers = require("./user-seeds");
const seedCarts = require("./cart-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedArtworks();
  console.log("\n----- ARTWORKS SEEDED -----\n");

  await seedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await seedCarts();
  console.log("\n----- CARTS SEEDED -----\n");

  process.exit(0);
};

seedAll();
