const router = require('express').Router()
const { BlogPost, User} = require('../models')
const withAuth = require('../utils/auth')

router.get('/', withAuth ,async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                excludes: ['password'],
            }
        })   
        const blogPosts = userData.map((user) => user.get({ plain: true })) 

        res.render('homepage', {
            blogPosts,
            logged_in: req.sessionStore.logged_in,
        })
    } catch (err) {
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
