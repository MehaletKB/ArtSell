const checkoutbtn = document.querySelector("checkoutbtn");
checkoutbtn.addEventListener("click", () => {
  fetch("http://localhost3001/checkout", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      items: [{ id: 1 }, { id: 2 }],
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((err) => {
      console, error(err.message);
    });
});
