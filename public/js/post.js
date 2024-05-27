document.getElementById('blog-post-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-description').value.trim();

    if (title && description) {
        try {
            const response = await fetch('/api/posts/create-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description }),
            });

            if (response.ok) {
                window.location.href = '/dashboard';
            } else {
                console.error('Could not create post:', response.statusText);
            }
        } catch (err) {
            console.error('Failed to create post:', err);
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('deleteBtn')) {
        const postElement = event.target.closest('.blogPost');
        const postId = postElement.dataset.postId;
        console.log('Post ID:', postId);

        fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                console.log('Post deleted successfully');
                postElement.remove();
            } else {
                console.error('Error deleting post');
            }
        })
        .catch(error => {
            console.error('Error deleting post:', error);
        });
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('updateBtn')) {
        const postElement = event.target.closest('.blogPost');
        const postId = postElement.dataset.postId;
        const updatedTitle = prompt('Enter updated title:');
        const updatedDescription = prompt('Enter updated description:');

        fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: updatedTitle, description: updatedDescription }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Post updated successfully');
                // Optionally update the post element in the UI with the new data
            } else {
                console.error('Error updating post');
            }
        })
        .catch(error => {
            console.error('Error updating post:', error);
        });
    }
});


