const asyncHandler = require('express-async-handler')

const Profile = require('../models/profileModel')

//@desc    Profile
//@route   POST /api/profile/userprofile
//@access  Public

const userProfile = asyncHandler(async (req, res) => {
  let { profileName, profileCategory, profileText, profilePost } = req.body

  const profile = await Profile.create({
    profileName,
    profileCategory,
    profileText,
    profilePost,
  })

  if (profile) {
    res.json({
      _id: profile._id,
      user: profile.user,
      profileName: profile.profileName,
      profileCategory: profile.profileCategory,
      profileText: profile.profileText,
      profilePost: profile.profilePost,
      hasError: false,
      message: 'profile created successfully',
    })
  } else {
    res.json({
      hasError: true,
    })
  }
})

const getAllUserProfile = asyncHandler(async (req, res) => {
  const userprofiles = await Profile.find({})

  if (userprofiles) {
    res.json({
      userprofiles,
    })
  }
})

module.exports = { userProfile, getAllUserProfile }
