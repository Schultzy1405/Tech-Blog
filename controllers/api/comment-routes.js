const router = require('express').Router();
const { BlogPost } = require('../../models');

router.post(`/blogposts/:postId/comments`, async (req, res) => {
    try {
        const { postId } = req.params;
        const { author, text } = req.body;

        const blogPost = await BlogPost.findByPk(postId);

        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        blogPost.comments.push({ author, text });
        await blogPost.save();

        res.status(201).json({ message: 'Comment added successfully', author, text });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Failed to add comment' });
    }
});

module.exports = router;