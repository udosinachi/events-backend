const router = require('express').Router()
const cors = require('cors')
const { protect } = require('../middleware/authMiddleware')

const {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
  getUserBlog,
  deleteBlog,
  editBlogText,
} = require('../controllers/blogController')

router.route('/blogposts').get(getAllBlogPost)
router.route('/:id').get(getBlogPostById)
router.route('/user/:id').get(getUserBlog)
router.route('/edit/:id').post(editBlogText)
router.route('/blogpost').post(protect, createBlogPost)
router.route('/delete/:id').delete(deleteBlog)

module.exports = router
