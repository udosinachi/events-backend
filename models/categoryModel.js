const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  name: {
    type: String,
  },
})

const Category = mongoose.model('Category', orderSchema)

module.exports = Category
