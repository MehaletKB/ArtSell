const button = document.getElementById("checkout-button");
    button.addEventListener("click", () => {
      fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        // `cart` is from localStorage
        // On the server in this appropratie route controller,
        // cart willb e in `req.body`.
        body: JSON.stringify(cart),
      })
        .then((res) => {
          if (res.status(200)) return res.json();
        })
        .then(({ url }) => {
          window.location = url;
        })
        .catch(err) {
          console.log(err)
        };
    });