const asyncHandler = require('express-async-handler')

const Blog = require('../models/blogModel')
const User = require('../models/userModel')

//@desc    Categories
//@route   POST /api/blog/blogpost
//@access  Public

const createBlogPost = asyncHandler(async (req, res) => {
  let { user, text, blogImage, category } = req.body

  const blog = await Blog.create({
    user: req.user._id,
    text,
    blogImage,
    category: req.user.category,
    name: req.user.businessName,
  })

  if (blog) {
    res.json({
      blog,
      hasError: false,
      message: 'Blog created successfully',
    })
  } else {
    res.json({
      hasError: true,
    })
  }
})

const getBlogPostById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  res.json({
    blog,
    hasError: false,
  })
})

const getAllBlogPost = asyncHandler(async (req, res) => {
  const blogposts = await Blog.find({})
  const latestposts = blogposts.reverse()
  if (blogposts) {
    res.json({
      latestposts,
    })
  }
})

const getUserBlog = asyncHandler(async (req, res) => {
  const user = await Blog.find({ user: req.params.id })
  const latestuserpost = user.reverse()
  res.json({
    latestuserpost,
    hasError: false,
  })
})

const deleteBlog = asyncHandler(async (req, res) => {
  const unblog = await Blog.findById(req.params.id)

  if (unblog) {
    await unblog.remove()
    res.json({ message: 'Post has been removed', hasError: false })
  } else {
    res.json({
      hasError: true,
    })
  }
})

const editBlogText = asyncHandler(async (req, res) => {
  let { text } = req.body
  const blogtext = await Blog.findByIdAndUpdate(req.params.id, {
    text: text ? text : req.blog.text,
  })

  res.json({
    hasError: false,
    message: 'Post Text Successfully edited',
    blogtext,
  })
})

module.exports = {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
  getUserBlog,
  deleteBlog,
  editBlogText,
}
