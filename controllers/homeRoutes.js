// eslint-disable-next-line new-cap
const router = require("express").Router();
const { Artwork, User } = require("../models");
const withAuth = require("../utils/auth");

// When the gallery loads and cycles through the artwork database, it will grab each artwork and pass it into the template
router.get("/", async (req, res) => {
  try {
    // Get all artwork and JOIN with user data
    const artworkData = await Artwork.findAll();

    // Serialize data so the template can read it
    const artworks = artworkData.map((art) => art.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      artworks,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ---------------- TYLER ----------------
// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: [{ model: Artwork }],
//     });
//     res.status(200).json(userData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/artwork/:id", async (req, res) => {
//   // if user is logged in , track their views

//   try {
//     const artworkData = await Artwork.findByPk(req.params.id, {
//       inculde: [
//         {
//           model: User,
//           attributes: ["name"],
//         },
//       ],
//     });
//     const artwork = artworkData.get({ plain: true });
//     res.render("artwork", {
//       ...artwork,
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

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

// ----------------------------------------------------------
// In Cart, we will cycle through the artwork and then display them in the cart.
router.get("/artwork/:id", async (req, res) => {
  // if user is logged in , track their views

  try {
    const artworkData = await Artwork.findByPk(req.params.id);
    const artwork = artworkData.get({ plain: true });
    res.render("artwork", {
      ...artwork,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// When we click on the "cart" option from the main menu, it checks to see if you are logged in. If not it re-directs you to the login page
// Use withAuth middleware to prevent access to route
router.get("/cart", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Artwork }],
    });

    const user = userData.get({ plain: true });

    res.render("cart", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ----------- 'hyperlink for "login" --------------
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to the cart route
  if (req.session.logged_in) {
    res.redirect("/cart");
    return;
  }

  res.render("login");
});

// ----------- 'hyperlink for "signup" --------------
router.get("/signup", (req, res) => {
  res.render("signup");
});

module.exports = router;
