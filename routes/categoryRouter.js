const router = require('express').Router()
const cors = require('cors')

const {
  createCategory,
  getAllCategory,
} = require('../controllers/categoryController')

router.route('/category').post(createCategory)
router.route('/allcategory').get(getAllCategory)

module.exports = router
