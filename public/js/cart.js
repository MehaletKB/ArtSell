// const { init } = require("../../models/User");

// const button = document.getElementById("checkout-button");
//     button.addEventListener("click", () => {
//       fetch("/cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         // `cart` is from localStorage
//         // On the server in this appropratie route controller,
//         // cart willb e in `req.body`.
//         body: JSON.stringify(cart),
//       })
//         .then((res) => {
//           if (res.status(200)) return res.json();
//         })
//         .then(({ url }) => {
//           window.location = url;
//         })
//         .catch(err) {
//           console.log(err)
//         };
//     });

function init() {
  generateStoreItems();
}

init();

function generateStoreItems() {
  const storeItems = [];
  let total = 0;
  for (let i = 1; i < 7; i++) {
    if (document.querySelector(`.name-${i}`)) {
      const name = document.querySelector(`.name-${i}`).innerText;
      const price = document.querySelector(`.price-${i}`).innerText * 100;
      total = +parseInt(price, 10);
      storeItems.push([i, { priceInCents: price, name }]);
      document.querySelector(".total").innerText = total;
      document.querySelector(".storeItems").innerText = storeItems;
    }
  }
}
