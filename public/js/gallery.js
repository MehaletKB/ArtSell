// the purpose of this js is to receive post posts and comment deletions.

// TODO: associate the "id" to the user id
// const id = req.session.user_id ???
// TODO: associate the "data-id" with the artworkIds
// http://localhost:3001/api/users/addArt/1
//  "artworkIds": [6]
//        --- or ---
// const artId = event.target.getAttribute("data-id");
//  "artworkIds": [artId]
const addToCartButton = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const artId = event.target.getAttribute("data-id");
    const data = { artworkIds: [artId] };
    console.log(window.sessionStorage);

    const response = await fetch(
      `http://localhost:3001/api/users/addArt/${userId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Sucess:", data);
      });

    if (response.ok) {
      console.log("yes");
    } else {
      alert("Failed to grab post");
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/users/deleteArt/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

// document
//   .querySelector(".artwork-list")
//   .addEventListener("click", delButtonHandler);

document
  .querySelector(".add-button")
  .addEventListener("click", addToCartButton);
