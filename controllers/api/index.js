const router = require('express').Router();
const blogPostRoutes = require('./blogposts');

router.use('/blogposts', blogPostRoutes);

module.exports = router;
