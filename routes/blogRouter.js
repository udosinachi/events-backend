const router = require('express').Router()
const cors = require('cors')
const { protect } = require('../middleware/authMiddleware')

const {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
} = require('../controllers/blogController')

router.route('/blogposts').get(getAllBlogPost)
router.route('/blogpost').post(createBlogPost)
router.route('/:id').get(getBlogPostById)

module.exports = router
