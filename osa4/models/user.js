// eslint-disable-next-line no-unused-vars
const config = require('../utils/config')
const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, minLength: 3, required: true },
  name: String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.password
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)