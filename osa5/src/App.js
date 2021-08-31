import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setsuccessMessage] = useState(null)
  const spaces = "    "

  const blogFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }
  
  const createBlog = (blogObject) => {
    blogService.create(blogObject)
    setsuccessMessage(`${blogObject.title} by ${blogObject.author} added!`)
    setBlogs(blogs.concat(blogObject))
    blogFormRef.current.toggleVisibility()
    setTimeout(() => {
      setsuccessMessage(null)
    }, 2000)

  }

  const addLikes = (id, blogObject) => {
    blogService.update(id, blogObject)
  }

  const deleteBlog = (id) => {
    blogService.deleteABlog(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
  }
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  blogs.sort(function(a, b) {
    return b.likes - a.likes 
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const blogForm = () => (
    <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
    </Togglable>
  )
  
 
  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} isError={true} />
        <h1>Log in to the application!</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="current-password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={successMessage} />
      <h2>Blogs</h2>
      <p>{user.name} logged in.{spaces}<button type="logout" onClick={handleLogout}>logout</button></p>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLikes={addLikes} user={user} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}


export default App