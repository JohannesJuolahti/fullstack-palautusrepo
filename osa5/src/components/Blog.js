import React, { useState } from 'react'
const Blog = ({ blog, addLikes, user, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [viewMore, setViewMore] = useState(false)
  const [handledBlog, setHandledBlog] = useState('')
  const [likes, setLikes] = useState(0)

  const toggleVisibility = () => {
    setViewMore(!viewMore)
    setHandledBlog(blog)
  }

  const removeBlog = () => {
    var deleteTheBlog = window.confirm(`Are you sure you want to remove ${handledBlog.title} by ${handledBlog.author}?`)
    if (deleteTheBlog) {
      deleteBlog(handledBlog.id)
    }
  }

  const incrementLikes = (event) => {
    event.preventDefault()
    setLikes(handledBlog.likes + 1)
    
    handledBlog.likes = handledBlog.likes + 1

    addLikes(handledBlog.id, handledBlog)
  }

  if (viewMore === false) {
    return (
      <div style={blogStyle}>
        <div key={blog.title}>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
        </div>
      </div>
      )
    }
    if (viewMore === true) {
    return (
    <div style={blogStyle}>
      <div key={blog.title}>
        {blog.title}<button onClick={toggleVisibility}>Hide</button>
      </div>
        <div>
          {blog.url}<br></br>
          Likes: {blog.likes === 0 ? likes : blog.likes}<button onClick={incrementLikes}>Like</button><br></br>
          {blog.author}
        </div>
        {handledBlog.user && handledBlog.user.id === user.id ? 
        <button onClick={removeBlog}>REMOVE</button>
        : ''}
    </div>
    )
  }
}

export default Blog