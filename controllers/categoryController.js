const asyncHandler = require('express-async-handler')

const Category = require('../models/categoryModel')

//@desc    Categories
//@route   POST /api/category/category
//@access  Public

const createCategory = asyncHandler(async (req, res) => {
  let { name } = req.body

  const category = await Category.create({
    name,
  })

  if (category) {
    res.json({
      _id: category._id,
      name: category.name,
      hasError: false,
      message: 'Category created successfully',
    })
  } else {
    res.json({
      hasError: true,
    })
  }
})

const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({})

  if (categories) {
    res.json({
      categories,
    })
  }
})

module.exports = { createCategory, getAllCategory }
