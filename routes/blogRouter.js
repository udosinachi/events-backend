const router = require('express').Router()
const cors = require('cors')

const {
  createBlogPost,
  getAllBlogPost,
} = require('../controllers/blogController')

router.route('/blogpost').post(createBlogPost)
router.route('/blogposts').get(getAllBlogPost)

module.exports = router
