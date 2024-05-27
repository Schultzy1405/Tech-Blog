const router = require('express').Router()
const { BlogPost, User} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            include: [{ model: User, attributes: ['name'] }],
            attributes: { exclude: ['password'] },
        }); 

        // Convert blog data to plain JSON
        const blogPosts = blogData.map(post => {
            const plainPost = post.get({ plain: true });
            // Assuming comments are stored as an array within each post
            plainPost.comments = plainPost.comments || []; // Ensure comments array exists
            return plainPost;
        });

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
// router.get('/', async (req, res) => {
//     try {
//         const blogPosts = await BlogPost.findAll();
//         res.render('homepage', { blogPosts });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/dashboard', withAuth ,async (req, res) => {
    try {
        const blogData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                { 
                model: User,
                attributes: ['name'],
            },
        ],
        });

        const blogPosts = blogData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            blogPosts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/')
    }
    res.render('login')
})
module.exports = router;
