const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const generateToken = require('../utilis/generateToken')
const User = require('../models/userModel')
const { passwordhtml } = require('../utilis/passwordhtml')

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
    isAdmin,
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
    isAdmin,
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
      isAdmin: user.isAdmin,
      message: 'User logged in successfully',
    })
  } else {
    res.json({
      hasError: true,
      message: 'Wrong user details',
    })
  }
})

const changePassword = asyncHandler(async (req, res) => {
  let { oldPassword, password } = req.body

  const user = await User.findOne({ email: req.user.email })

  if (user && (await user.matchPassword(oldPassword))) {
    const salt = await bcrypt.genSalt(10)
    let newPassword = await bcrypt.hash(password, salt)

    await User.findByIdAndUpdate(user._id, {
      password: newPassword,
    })
  } else {
    res.json({
      hasError: false,
      message: 'Password Changed Successfully',
    })
  }
})

const resetPassword = asyncHandler(async (req, res) => {
  let { token, password } = req.body

  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const salt = await bcrypt.genSalt(10)
    let newPassword = await bcrypt.hash(password, salt)

    await User.findByIdAndUpdate(decoded.id, { password: newPassword })

    res.json({ hasError: false, message: 'New Password has been Created' })
  }
})

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email })
  // console.log(user, email)

  if (user) {
    const token = generateToken(user._id)
    const datas = passwordhtml(token)

    var transporter = nodemailer.createTransport({
      host: 'mail.midraconsulting.com',
      port: 8889,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: 'bobby@midraconsulting.com',
        pass: '1nt3n@t10n@l',
      },
    })

    let data = datas

    const mailOptions = {
      from: 'bobby@midraconsulting.com', // sender address
      to: email, // list of receivers
      subject: 'test mail', // Subject line
      html: data, // plain text body
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) console.log(err)
      else console.log(info)
    })
    res.send({
      hasError: false,
      message: 'please check your email for reset link',
    })
  } else {
    res.json({
      hasError: false,
      message: 'Reset Link has been successfully sent',
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

  // for (let i = 0; i < users.length; i++) {
  //   await User.findByIdAndUpdate(users[i]._id, { isAdmin: false })
  // }

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

const editUser = asyncHandler(async (req, res) => {
  let { email, fullName, businessName, phoneNumber, category, userText } =
    req.body

  const edit = await User.findByIdAndUpdate(req.user._id, {
    email: email ? email : req.user.email,
    fullName: fullName ? fullName : req.user.fullName,
    businessName: businessName ? businessName : req.user.businessName,
    phoneNumber: phoneNumber ? phoneNumber : req.user.phoneNumber,
    category: category ? category : req.user.category,
    userText: userText ? userText : req.user.userText,
  })

  res.json({
    hasError: false,
    message: 'Profile Successfully Updated',
    email,
    fullName,
    businessName,
    phoneNumber,
    category,
    userText,
  })
})

const editProfileImage = asyncHandler(async (req, res) => {
  let { image } = req.body

  const editImage = await User.findByIdAndUpdate(req.user._id, {
    image: image ? image : req.user.image,
  })

  res.json({
    hasError: false,
    message: 'Image Succesfully Changed',
    image,
  })
})

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  getUserById,
  classifyCategory,
  editUser,
  editProfileImage,
  changePassword,
  forgotPassword,
  resetPassword,
}
