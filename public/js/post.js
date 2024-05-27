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