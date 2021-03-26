const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const roleValido = {
  values: ['admin'],
  message: '{VALUE} no es un role valido'
}
// Defino los datos que va a tener el usuario en la base de datos
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    required: false
  },
  role: {
    type: String,
    default: 'admin',
    enum: roleValido
  },
  active: {
    type: Boolean,
    default: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  }

})

userSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })

module.exports = mongoose.model('Users', userSchema)
