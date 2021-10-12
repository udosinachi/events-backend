const router = require('express').Router()
const cors = require('cors')

const {
  registerUser,
  getUsers,
  loginUser,
  getUserById,
} = require('../controllers/userController')

router.route('/').get(getUsers)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/:id').get(getUserById)

module.exports = router
