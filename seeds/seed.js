const sequelize = require("../config/connection");
const { User, Artwork } = require("../models");

const userData = require("./userSeedData.json");
const artworkData = require("./artworkSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const artwork of artworkData) {
    // eslint-disable-next-line no-await-in-loop
    await Artwork.create({
      ...artwork,
      // eslint-disable-next-line camelcase
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
