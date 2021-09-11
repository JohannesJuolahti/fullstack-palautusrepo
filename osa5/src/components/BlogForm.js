import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const spaces = '    '

  const handleChange = (event) => {
    if (event.target.name === 'Title') {
      setTitle(event.target.value)
    } else if (event.target.name === 'Author')  {
      setAuthor(event.target.value)
    } else (
      setUrl(event.target.value)
    )
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
            Title:{spaces}
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={handleChange}
          />
        </div>
        <div>
            Author:{spaces}
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={handleChange}
          />
        </div>
        <div>
            Url:{spaces}
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={handleChange}
          />
        </div>
        <button id="createBlog" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm