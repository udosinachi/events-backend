const router = require('express').Router()
const cors = require('cors')
const { admin, protect } = require('../middleware/authMiddleware')

const {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
  getUserBlog,
  deleteBlog,
  editBlogText,
  adminDeleteBlog,
} = require('../controllers/blogController')

router.route('/blogposts').get(getAllBlogPost)
router.route('/:id').get(getBlogPostById)
router.route('/user/:id').get(getUserBlog)
router.route('/edit/:id').post(protect, editBlogText)
router.route('/blogpost').post(protect, createBlogPost)
router.route('/delete/:id').delete(protect, deleteBlog)
router.route('/admindelete/:id').delete(admin, protect, adminDeleteBlog)

module.exports = router
