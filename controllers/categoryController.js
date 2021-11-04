const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const Category = require('../models/categoryModel')

//@desc    Register user & get token
//@route   POST /api/users/register
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
