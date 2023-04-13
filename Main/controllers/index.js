const router = require('express').Router();
const userRoutes = require('./user-routes');
const blogPostRoutes = require('./blogPost-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/blogPosts', blogPostRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
