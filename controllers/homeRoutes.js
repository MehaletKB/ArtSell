// eslint-disable-next-line new-cap
const router = require("express").Router();
const { Artwork, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const artworkData = await Artwork.findAll();

    const galleries = artworkData.map((gallery) =>
      gallery.get({ plain: true })
    );
    res.render("homepage", {
      galleries,
      loggedIn: req.session.loggedIn,
    });
    res.status(200).json(artworkData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/artwork/:id", async (req, res) => {
  // if user is logged in , track their views

  try {
    const artworkData = await Artwork.findByPk(req.params.id, {});
    const artwork = artworkData.get({ plain: true });
    res.render("artwork", {
      ...artwork,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post("/artwork/:id", async (req, res) => {
// add to cart
// get user from req.session.user
// get art from req.paramas.id
// update purchase to is_In_Cart
// });

// router.get("/cart", (req, res) => {
// send back data for all purchases is_IN_Cart
// });
// router.post("/cart"); // update purchases to bought

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// router. get cart
router.get("/cart", (req, res) => {
  res.render("cart");
});

// router. get recipt

// router. put to update cart

module.exports = router;
