const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogRoutes = require('./blogposts')
router.use('/users', userRoutes);
router.use('/posts', blogRoutes);

module.exports = router;
