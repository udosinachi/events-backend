const router = require('express').Router()
const cors = require('cors')
const { protect } = require('../middleware/authMiddleware')

const {
  createBlogPost,
  getAllBlogPost,
} = require('../controllers/blogController')

router.route('/blogpost').post(protect, createBlogPost)
router.route('/blogposts').get(getAllBlogPost)

module.exports = router
