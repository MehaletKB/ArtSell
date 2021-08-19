const { User } = require("../models");

const userData = [
  {
    name: "Dave",
    email: "d@gmail.com",
    password: "123456",
  },
  {
    name: "Lernantino",
    email: "lernantino@gmail.com",
    password: "supersecret22",
  },
  {
    name: "Amiko",
    email: "amiko2k20@aol.com",
    password: "megasecret333",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
