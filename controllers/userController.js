const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const generateToken = require('../utilis/generateToken')
const User = require('../models/userModel')

//@desc    Register user & get token
//@route   POST /api/users/register
//@access  Public

const registerUser = asyncHandler(async (req, res) => {
  let {
    email,
    password,
    fullName,
    businessName,
    phoneNumber,
    category,
    userText,
  } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.json({
      hasError: true,
      message: 'User already exists',
    })
  }

  const user = await User.create({
    fullName,
    businessName,
    email,
    password,
    phoneNumber,
    category,
    userText,
  })

  if (user) {
    res.status(201).json({
      user,
      token: generateToken(user._id),
      image: user.image,
      hasError: false,
      message: 'User created successfully',
    })
  } else {
    res.json({
      hasError: true,
    })
  }
})

//@desc    Login user
//@route   POST /api/users/login
//@access  Public

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      businessName: user.businessName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      category: user.category,
      token: generateToken(user._id),
      image: user.image,
      hasError: false,
      message: 'User logged in successfully',
    })
  } else {
    res.json({
      hasError: true,
      message: 'Wrong user details',
    })
  }
})

//@desc    Get user by ID
//@route   GET /api/users/login/:id
//@access  Public

const getUserById = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.params.id)

  if (userId) {
    res.json({ userId, hasError: false })
  } else {
    res.json({
      hasError: true,
      message: "User Id doesn't exist",
    })
  }
})

// get users

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  if (users) {
    res.json({
      users,
    })
  }
})

const classifyCategory = asyncHandler(async (req, res) => {
  const classify = await User.find({ category: req.params.cats })

  res.json({ hasError: false, classify })
})

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  getUserById,
  classifyCategory,
}
