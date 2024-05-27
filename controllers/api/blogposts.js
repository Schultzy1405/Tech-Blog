const router = require('express').Router()
const { User, BlogPost } = require('../../models')
const withAuth = require('../../utils/auth')

router.post('/', async (req,res) => {
    try {
        const blogData = await BlogPost.findAll()
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/dashboard', withAuth, async (req,res) => {
    try {
        const blogData = await BlogPost.findAll({
            where : {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blogPosts = blogData.map((post) => post.get({ plain: true }))

        res.render('dashboard', {
            blogPosts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/create-post', withAuth, async (req,res) => {
    try {
        const { title, description } = req.body;

        // Grabbing the logged-in users ID from the session
        const userId = req.session.user_id

        const newPost = await BlogPost.create({
            title,
            description,
            user_id: userId, // Associate the blog post with the logged-in user
        });

        res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create post' });
    }
});
router.post('/:postId/comments', async (req, res) => {
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