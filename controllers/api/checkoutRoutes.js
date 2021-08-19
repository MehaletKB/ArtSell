require("dotenv").config();
const stripe = require("stripe")("sk_test_51JPZC4K60rZX65bHK0AMAuddsaMbHDlTIdxqnl4a06ugqaETcbaQHAV0WTc0ahSeJFwiWe7NYfcJVo3RPjjmP26V00tVyJw8Op");

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Demeter" }],
  [2, { priceInCents: 20000, name: "Vis" }],
]);

app.post("/checkout", async (req, res) => {
  try {
    const session = stripe.checkout.sessions.create({
      payment_method_types" ["card],
      mode: "payment",
      line_items: req.body.items.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity
        }
      }),
      success_url:`http://localhost:3001/`
      cancel_url:`http://localhost:3001/checkout`
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
