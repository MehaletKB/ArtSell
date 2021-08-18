// the purpose of this js is to receive post posts and comment deletions.

// TODO: associate the "id" to the user id
// const id = req.session.user_id ???
// TODO: associate the "data-id" with the artworkIds
// http://localhost:3001/api/users/addArt/1
//  "artworkIds": [6]
//        --- or ---
// const artId = event.target.getAttribute("data-id");
//  "artworkIds": [artId]

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

document
  .querySelector(".artwork-list")
  .addEventListener("click", delButtonHandler);
