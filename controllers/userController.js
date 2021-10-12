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
  let { email, password, firstName, lastName, phoneNumber } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
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

module.exports = { registerUser, getUsers, loginUser, getUserById }
