const router = require('express').Router()
const cors = require('cors')
const { protect } = require('../middleware/authMiddleware')

const {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
  getUserBlog,
} = require('../controllers/blogController')

router.route('/blogposts').get(getAllBlogPost)
router.route('/:id').get(getBlogPostById)
router.route('/user/:id').get(getUserBlog)
router.route('/blogpost').post(protect, createBlogPost)

module.exports = router
