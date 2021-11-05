const router = require('express').Router()
const cors = require('cors')

const {
  userProfile,
  getAllUserProfile,
} = require('../controllers/profileController')

router.route('/userprofile').post(userProfile)
router.route('/userprofiles').get(getAllUserProfile)

module.exports = router
