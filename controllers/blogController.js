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
  if (blogposts) {
    res.json({
      blogposts,
    })
  }
})

const getUserBlog = asyncHandler(async (req, res) => {
  const user = await Blog.find({ user: req.params.id })

  // const pe = await User.find({})

  // for (let i = 0; i < pe.length; i++) {
  //   if (pe.length === 4) {
  //     for (let j = 0; j < user.length; j++) {
  //       await Blog.findByIdAndUpdate(user[j]._id, {
  //         user: pe[i]._id,
  //       })
  //     }
  //   }
  // }

  res.json({
    user,
    hasError: false,
  })
})

module.exports = {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
  getUserBlog,
}
