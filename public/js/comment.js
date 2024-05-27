document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.comment-form').forEach(form => {
      form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const postId = form.dataset.postId;
          const author = form.querySelector('input[name="author"]').value;
          const text = form.querySelector('textarea[name="text"]').value;

          try {
              const response = await fetch(`/api/blogposts/${postId}/comments`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ author, text }),
              });

              if (response.ok) {
                  const data = await response.json();
                  const commentList = form.parentElement.querySelector('.comment-list');

                  if (commentList) {
                      commentList.innerHTML += `<li>${data.text} - ${data.author}</li>`;
                      form.reset(); // Clear the form after submission
                  } else {
                      console.error('Comment list not found');
                      console.log(form.parentElement); // Output the parent element for debugging
                  }
              } else {
                  console.error('Failed to submit comment');
              }
          } catch (error) {
              console.error('Error submitting comment:', error);
          }
      });
  });
});
