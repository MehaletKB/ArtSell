const router = require("express").Router();
const Artwork = require("./Artwork");

function calcOrderTotal(artwork) {
  return artwork.reduce((total, { price }) => {
    total += price;
    return total;
  }, 0);
}

function fillOrder(incomingCart) {
  return Promise.all(
    incomingCart.map(async (id) => {
      const artwork = await Artwork.findOne({
        where: { id },
        raw: true,
      });
      return artwork;
    })
  );
}

function printListItems(artwork) {
  return artwork
    .map(
      ({ name, price }) => `<li>${name}</li> - <strong>$${price}</strong></li>`
    )
    .join("\n");
}

function printOrder({ username }, products) {
  return;
  `<h1>Congratulations ${username}!</h1>
  <p>You are now the proud owner of</p>
    <ol>
    ${printListItems(products)}
    </ol>
  <p><strong>Grand Total: $${calcOrderTotal}</strong></p>
  <p>Thank you for your support!</p>`;
}

class OrderController {
  static async processOrder(user, cart) {
    const orderedArtwork = await fillOrder(cart);
    console.log(orderedArtwork);
    printOrder(user, orderedArtwork);
  }
}

router.post("/cart", (req, _) => {
  OrderController.processOrder(req.session.user_id, req.body);
});

module.exports = OrderController;
