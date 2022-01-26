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
  makeAdmin,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').get(protect, admin, getUsers)
router.route('/:id').get(getUserById)
router.route('/category/:cats').get(classifyCategory)
router.route('/makeadmin/:id').get(makeAdmin)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/edit').post(protect, editUser)
router.route('/editimage').post(protect, editProfileImage)
router.route('/changepassword').post(protect, changePassword)
router.route('/forgotpassword').post(forgotPassword)
router.route('/resetpassword').post(resetPassword)
router.route('/deleteuser/:id').delete(protect, admin, deleteUser)

module.exports = router
