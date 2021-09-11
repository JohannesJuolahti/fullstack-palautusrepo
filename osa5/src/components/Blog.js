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
  const hideWhenVisible = { display: viewMore ? 'none' : '' }
  const showWhenVisible = { display: viewMore ? '' : 'none' }
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
    setLikes(blog.likes + 1)

    blog.likes = blog.likes + 1

    addLikes(blog.id, blog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div id="blogInformation">
          {blog.title} {blog.author} <button onClick={toggleVisibility} id="viewButton">View</button>
        </div>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>
          {blog.title}<button onClick={toggleVisibility}>Hide</button>
        </div>
        <div>
          <span>{blog.url}<br></br></span>
          <span>Likes: {blog.likes === 0 ? likes : blog.likes}</span><button onClick={incrementLikes}
            className="addLikesButton">Like</button><br></br>
          {blog.author}
        </div>
        {handledBlog.user && handledBlog.user.id === user.id ?
          <button onClick={removeBlog} id="removeButton">REMOVE</button>
          : ''}
      </div>
    </div>
  )
}

export default Blog