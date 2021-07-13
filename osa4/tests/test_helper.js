const Blog = require('../models/blog')
const User = require('../models/user')

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'idontexist',
    url: 'idontexist.com',
    likes: '123'
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const findBlogById = async (id) => {
  const blog = await Blog.findById(id)
  return blog
}

module.exports = {
  nonExistingId, blogsInDb, findBlogById, usersInDb
}