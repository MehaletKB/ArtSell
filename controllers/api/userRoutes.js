/* eslint-disable camelcase */
// eslint-disable-next-line new-cap
const router = require("express").Router();
const { User, Cart, Artwork } = require("../../models");

// use for Insomnia
router.get("/", async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const userData = await User.findAll({
      include: [{ model: Artwork }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update product data
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // .then((user) =>
    .then(() =>
      // find all associated tags from ProductTag
      Cart.findAll({ where: { userId: req.params.id } })
    )
    .then((carts) => {
      // get list of current tag_ids
      const cartIds = carts.map(({ artworkId }) => artworkId);
      // create filtered list of new tag_ids
      const newCarts = req.body.artworkIds
        .filter((artworkId) => !cartIds.includes(artworkId))
        .map((artworkId) => ({
          userId: req.params.id,
          artworkId,
        }));
      // figure out which ones to remove
      const cartsToRemove = carts
        .filter(({ artworkId }) => !req.body.artworkIds.includes(artworkId))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Cart.destroy({ where: { id: cartsToRemove } }),
        Cart.bulkCreate(newCarts),
      ]);
    })
    .then((updatedCarts) => res.json(updatedCarts))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// TODO: "":id" is the userId, pass through a hidden field called "artworkIds" which references the artwork id to be added. looks like this (user 1 adds art 6):
// http://localhost:3001/api/users/addArt/1
//  "artworkIds": [6]

router.put("/addArt/:id", (req, res) => {
  // update product data
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // .then((user) =>
    .then(() =>
      // find all associated tags from ProductTag
      Cart.findAll({ where: { userId: req.params.id } })
    )
    .then((carts) => {
      // get list of current tag_ids
      const cartIds = carts.map(({ artworkId }) => artworkId);
      // create filtered list of new tag_ids
      const newCarts = req.body.artworkIds
        .filter((artworkId) => !cartIds.includes(artworkId))
        .map((artworkId) => ({
          userId: req.params.id,
          artworkId,
        }));

      // run both actions
      return Promise.all([Cart.bulkCreate(newCarts)]);
    })
    .then((updatedCarts) => res.json(updatedCarts))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/deleteArt/:id", (req, res) => {
  // update product data
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    // .then((user) =>
    .then(() =>
      // find all associated tags from ProductTag
      Cart.findAll({ where: { userId: req.params.id } })
    )
    .then((carts) => {
      // get list of current tag_ids
      const cartIds = carts.map(({ artworkId }) => artworkId);
      // create filtered list of new tag_ids
      const newCarts = req.body.artworkIds
        .filter((artworkId) => !cartIds.includes(artworkId))
        .map((artworkId) => ({
          userId: req.params.id,
          artworkId,
        }));
      // figure out which ones to remove
      const cartsToRemove = carts
        .filter(({ artworkId }) => req.body.artworkIds.includes(artworkId))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        Cart.destroy({ where: { id: cartsToRemove } }),
        Cart.bulkCreate(newCarts),
      ]);
    })
    .then((updatedCarts) => res.json(updatedCarts))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
