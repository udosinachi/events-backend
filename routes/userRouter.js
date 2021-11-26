const router = require('express').Router()
const cors = require('cors')

const {
  registerUser,
  getUsers,
  loginUser,
  getUserById,
  classifyCategory,
  editUser,
} = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').get(getUsers)
router.route('/:id').get(getUserById)
router.route('/category/:cats').get(classifyCategory)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/edit').post(protect, editUser)

module.exports = router
