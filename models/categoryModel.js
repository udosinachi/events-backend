const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  name: {
    type: String,
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
