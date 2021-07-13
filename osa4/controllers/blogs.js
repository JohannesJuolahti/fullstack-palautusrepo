const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1, name: 1, id: 1
  })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  let error = validateBlog(request.body)
  if (error !== '') {
    return response.status(400).send(error)
  }
  if (!request.user) {
    return response.status(401).json({ error: 'token missing' })
  }
  const body = request.body

  const token = request.token

  /*
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  */

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes ? body.likes : 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  const token = request.token
  if (!token) {
    return response.status(401).json( { error: 'token missing' })
  }
  /*
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  */
  const user = request.user
  //const user = await User.findById(decodedToken.id)

  const blogUserId = blog.user._id.toString()
  const userIdOfDeleter = user._id.toString()

  if (blogUserId === userIdOfDeleter) {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  } else {
    response.status(401).json({ error: 'illegal deletion attempt' })
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  let updatableBlog = await Blog.findById(request.params.id)

  const blog = {
    title: updatableBlog.title,
    author: updatableBlog.author,
    url: updatableBlog.url,
    likes: body.likes ? body.likes : updatableBlog.likes
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(204)
  } catch(exception) {
    next(exception)
  }
})

function validateBlog(input) {
  if (!input.title && !input.url) {
    return 'Title and url must be specified!'
  }
  return ''
}

module.exports = blogsRouter
