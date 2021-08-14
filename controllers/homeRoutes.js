// eslint-disable-next-line new-cap
const router = require("express").Router();
const { Artwork, User } = require("../models");

router.get("/", async (req, res) => {
  res.render("homepage", {
    // eslint-disable-next-line camelcase
    logged_in: req.session.logged_in,
  });
});

router.get("/artwork/:id", async (req, res) => {
  // if user is logged in , track their views

  try {
    const artworkData = await Artwork.findByPk(req.params.id, {
      inculde: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
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

module.exports = router;
