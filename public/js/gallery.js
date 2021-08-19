// the purpose of this js is to receive post posts and comment deletions.

const addToCartButton = async (event) => {
  const artworkIds = event.target.getAttribute("art-id").split`,`.map((x) =>
    Number(x)
  );
  // const artworkIds = event.target.getAttribute("art-id").split();

  const data = { artworkIds: [artworkIds] };
  const userId = document.querySelector(".userId").innerText;

  // console.log(artworkIds);

  const response = await fetch(`/api/users/addArt/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
  // .then((data) => {
  //   console.log("Sucess:", data);
  // });

  if (response.ok) {
    console.log("yes");
  } else {
    // alert("Failed to grab post");
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`/api/users/deleteArt/${id}`, {
//       method: "DELETE",
//     });

//     if (response.ok) {
//       document.location.replace("/dashboard");
//     } else {
//       alert("Failed to delete post");
//     }
//   }
// };

// document
//   .querySelector(".artwork-list")
//   .addEventListener("click", delButtonHandler);

document.querySelector(".art-list").addEventListener("click", addToCartButton);
