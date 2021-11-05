const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  profileName: {
    type: String,
  },
  profileCategory: {
    type: String,
  },
  profileText: {
    type: String,
  },
  profilePost: [
    {
      type: String,
    },
  ],
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile
