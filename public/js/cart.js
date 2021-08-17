// In the checkout file, we will need to be able to delete an artwork and submit our order.

// -----------------------------------------------------------------------------

// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#comment-title').value.trim();
//   const description = document.querySelector('#comment-desc').value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/comments`, {
//       method: 'POST',
//       body: JSON.stringify({ title, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/post');
//     } else {
//       alert('Failed to create project');
//     }
//   }
// };

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/comments/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/post');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

// document
//   .querySelector('.new-comment-form')
//   .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.comment-list')
//   .addEventListener('click', delButtonHandler);
