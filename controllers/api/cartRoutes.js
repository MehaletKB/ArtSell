/* eslint-disable camelcase */
// eslint-disable-next-line new-cap
const router = require("express").Router();
const { Cart } = require("../../models");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

router.post("/", async (req, res) => {
  try {
    const userData = await Cart.create(req.body);

    req.session.save(() => {
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const art = req.body.storeItems;
    // console.log(art[0][1].name);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: art.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item[1].name,
          },
          unit_amount: item[1].priceInCents,
        },
        quantity: 1,
      })),
      success_url: "http://localhost3001/",
      cancel_url: "http://localhost3001/",
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// router.post("/login", async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: "Incorrect email or password, please try again" });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.json({ user: userData, message: "You are now logged in!" });
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post("/logout", (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
