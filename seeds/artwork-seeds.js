const { Artwork } = require("../models");

const artworkData = [
  {
    name: "Demeter",
    artist: "Mehalet",
    price: 100,
  },
  {
    name: "Liberty",
    artist: "Taty",
    price: 500,
  },
  {
    name: "Lucid",
    artist: "Mehalet",
    price: 600,
  },
  {
    name: "Side",
    artist: "Taty",
    price: 400,
  },
  {
    name: "Vis",
    artist: "Mehalet",
    price: 300,
  },
  {
    name: "Wane",
    artist: "Taty",
    price: 200,
  },
];

const seedComments = () => Artwork.bulkCreate(artworkData);

module.exports = seedComments;
