const router = require('express').Router()
const cors = require('cors')

const {
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
  deleteUser,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').get(getUsers)
router.route('/:id').get(getUserById)
router.route('/category/:cats').get(classifyCategory)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/edit').post(protect, editUser)
router.route('/editimage').post(protect, editProfileImage)
router.route('/changepassword').post(protect, changePassword)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword').post(resetPassword)
router.route('/deleteuser/:id').delete(deleteUser)

module.exports = router
