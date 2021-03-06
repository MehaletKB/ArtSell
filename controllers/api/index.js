const router = require("express").Router();
const userRoutes = require("./userRoutes");
const cartRoutes = require("./cartRoutes");

router.use("/users", userRoutes);
router.use("/carts", cartRoutes);

module.exports = router;
