const router = require('express').Router()
const cors = require('cors')
const { protect } = require('../middleware/authMiddleware')

const {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
} = require('../controllers/blogController')

router.route('/blogpost').post(protect, createBlogPost)
router.route('/:id').get(getBlogPostById)
router.route('/blogposts').get(getAllBlogPost)

module.exports = router
