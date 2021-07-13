const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs',
    { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(user => user.toJSON()))
})

userRouter.post('/', async (request, response, next) => {
  const body = request.body
  const passwordValidity = validatePassword(body)

  if (passwordValidity !== '') {
    return response.status(400).json({ error: passwordValidity })
  }

  const saltRounds = 10

  const user = new User({
    username: body.username,
    name: body.name,
    password: await bcrypt.hash(body.password, saltRounds)
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser.toJSON())
  } catch(exception) {
    next(exception)
  }
})

function validatePassword(body) {
  if (!body.password) {
    return `missing password for user ${body.username}`
  }
  if (body.password.length < 3) {
    return `password length shorter than 3 for ${body.username}`
  }
  return ''
}

module.exports = userRouter
