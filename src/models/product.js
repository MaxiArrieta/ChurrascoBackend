const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Defino los datos que va a tener el usuario en la base de datos
const productSchema = new Schema({
  SKU: {
    type: String,
    required: true
  },
  code: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  pictures: {
    type: Array,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Products', productSchema)
