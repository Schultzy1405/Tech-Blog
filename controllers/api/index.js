const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blogposts')
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes);
router.use('/posts', blogRoutes);
router.use('/:postId', commentRoutes)

module.exports = router;
