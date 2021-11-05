const asyncHandler = require('express-async-handler')

const Blog = require('../models/blogModel')

//@desc    Categories
//@route   POST /api/blog/blogpost
//@access  Public

const createBlogPost = asyncHandler(async (req, res) => {
  let { user, text, blogImage } = req.body

  const blog = await Blog.create({
    user,
    text,
    blogImage,
    name: `${req.user.firstName} ${req.user.lastName}`,
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

const getAllBlogPost = asyncHandler(async (req, res) => {
  const blogposts = await Blog.find({})

  if (blogposts) {
    res.json({
      blogposts,
    })
  }
})

module.exports = { createBlogPost, getAllBlogPost }
