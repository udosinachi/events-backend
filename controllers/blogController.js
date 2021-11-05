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
  })

  if (blog) {
    res.json({
      _id: blog._id,
      user: blog.user,
      text: blog.text,
      blogImage: blog.blogImage,
      createdAt: blog.createdAt,
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
