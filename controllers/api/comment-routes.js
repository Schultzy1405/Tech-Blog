const router = require('express').Router();
const { BlogPost, Comment } = require('../../models');

router.post(`/:postId/comments`, async (req, res) => {
    try {
        const { postId } = req.params;
        const { author, text } = req.body;

        const blogPost = await BlogPost.findByPk(postId);

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        // Initialize comments array if it's null
        if (!blogPost.comments) {
            blogPost.comments = [];
        }

        // Create a new comment object
        const newComment = {
            author,
            text
        };

        // Push the new comment into the comments array
        blogPost.comments.push(newComment);

        // Save the updated blog post with the new comment
        await blogPost.save();

        res.status(201).json({ message: 'Comment added successfully', author, text });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

module.exports = router;