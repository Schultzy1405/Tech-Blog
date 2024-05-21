const router = require('express').Router()
const { User, BlogPost } = require('../../models')

router.post('/', async (req,res) => {
    try {
        const blogData = await BlogPost.findAll({
            include: [{ model: User}]
        })
        res.status(200).json(blogData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})
module.exports = router;