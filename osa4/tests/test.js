/* eslint-disable no-undef */
const { expect } = require('@jest/globals')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const config = require('../utils/config')

const api = supertest(app)

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(48)
  })
})

describe('favorite blog', () => {

  test('votes of empty list is zero and empty authors and titles', () => {
    const result = listHelper.favoriteBlog([])
    expect(result.maxTitle).toEqual('')
    expect(result.maxAuthor).toEqual('')
    expect(result.maxLikes).toEqual(0)
  })

  test('when list has only one blog returns that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result.maxTitle).toEqual('Go To Statement Considered Harmful')
    expect(result.maxAuthor).toEqual('Edsger W. Dijkstra')
    expect(result.maxLikes).toEqual(5)
  })

  test('result of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result.maxTitle).toEqual('Canonical string reduction')
    expect(result.maxAuthor).toEqual('Edsger W. Dijkstra')
    expect(result.maxLikes).toEqual(12)
  })
})

describe('most blogs', () => {
  test('votes of empty list is zero and empty authors and titles', () => {
    const result = listHelper.mostBlogs([])
    expect(result.author).toEqual('')
    expect(result.blogs).toEqual(0)
  })
  test('when list has only one then returns that author and blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result.author).toEqual('Edsger W. Dijkstra')
    expect(result.blogs).toEqual(1)
  })
  test('result of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result.author).toEqual('Edsger W. Dijkstra')
    expect(result.blogs).toEqual(3)
  })
})

describe('most likes', () => {
  test('votes of empty list is zero and empty authors and titles', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual('')
  })
  test('when list has only one then returns that author and blogs', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ 'Edsger W. Dijkstra': 5 })
  })
  test('result of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ 'Edsger W. Dijkstra': 29 })
  })
})

describe('api tests', () => {
  test('test receives correct amount of blogs from db', async () => {
    const response = await api.get('/api/blogs').expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(response.body).toHaveLength(blogsAtEnd.length)
  })

  test('documents should use id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('blogs can be added to db', async () => {

    // To be able to know whether a new blog was added.
    const blogsAtTheBeginning = await helper.blogsInDb()

    const newBlog = {
      title: 'I am a test generated blog',
      author: 'Mr Jest',
      url: 'www.iamgeneratedbyaunittest.com',
      likes: '123'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', config.TEST_USER_TOKEN)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtTheBeginning.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'I am a test generated blog'
    )

  })

  test('if likes is not given a value it will be 0', async () => {

    const newBlog = {
      title: 'I am a test generated blog with 0 likes',
      author: 'Mr Jest',
      url: 'www.iamgeneratedbyaunittest.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', config.TEST_USER_TOKEN)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    blogsAtEnd.map(n => {
      if (n.title === 'I am a test generated blog with 0 likes') {
        expect(n.likes).toEqual(0)
      }
    })
  })

  test('if title and url is not given a value 400 is received', async () => {

    const newBlog = {
      author: 'Mr Jest',
      likes: 123
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })

  test('blog is able to be deleted', async () => {
    const response = await helper.blogsInDb()
    let deletableId = ''
    response.map(blog => {
      if (blog.title === 'I am a test generated blog with 0 likes') {
        deletableId = blog.id
      }
    })

    await api
      .delete(`/api/blogs/${deletableId}`)
      .set('Authorization', config.TEST_USER_TOKEN)
      .expect(204)
  })

  test('TODO blogs likes are able to be updated TODO', async () => {
    expect(0).toEqual(0)
  })

  test('test receives correct amount of users from db', async () => {
    const response = await api.get('/api/users').expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(response.body).toHaveLength(usersAtEnd.length)
  })

  test('TODO USERS CAN BE ADDED TO DB TODO', async () => {
    expect(1).toEqual(1)
  })

  test('non valid user is not added to db', async () => {
    var users = []
    let user = new User({
      username: 'AB',
      name: 'validUsername',
      password: 'validPassword'
    })
    let user2 = new User({
      username: 'artohellas@hellas.fi',
      name: 'validUsername',
      password: 'validPassword'
    })
    let user3 = new User({
      name: 'validUsername',
      password: 'validPassword'
    })
    let user4 = new User({
      username: 'ABC',
      name: 'validUsername'
    })
    let user5 = new User({
      username: 'ABC',
      name: 'validUsername',
      password: '12'
    })
    users.push(user)
    users.push(user2)
    users.push(user3)
    users.push(user4)
    users.push(user5)

    for (usr in users) {
      await api
        .post('/api/users')
        .send(usr)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    }
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('blog is not created if token is not provided', async () => {
    const newBlog = {
      title: 'I am a test generated blog',
      author: 'Mr Jest',
      url: 'www.iamgeneratedbyaunittest.com',
      likes: '123'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})