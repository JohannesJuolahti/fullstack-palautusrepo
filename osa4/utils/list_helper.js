// Load the full build.
var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sumOfLikes = 0
  if (blogs.length !== 0) {
    blogs.map(blog => {
      sumOfLikes += blog.likes
    })
  }
  return sumOfLikes
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let maxAuthor = ''
  let maxTitle = ''
  if (blogs.length !== 0) {
    blogs.map(blog => {
      if (maxLikes === 0) {
        maxTitle = blog.title
        maxAuthor = blog.author
        maxLikes = blog.likes
      }
      if (blog.likes > maxLikes && maxLikes !== 0) {
        maxTitle = blog.title
        maxAuthor = blog.author
        maxLikes = blog.likes
      }
    })
  }
  return { maxTitle, maxAuthor, maxLikes }
}

const mostBlogs = (blogz) => {
  var authors = []
  var authorsBlogs = []
  let blogs = 0
  let author = ''
  blogz.map(blog => {
    authors.push(blog.author)
  })
  authorsBlogs = arrToInstanceCountObj(authors)
  for (const atr in authorsBlogs) {
    if (blogs === 0) {
      author = atr
      blogs = authorsBlogs[atr]
    }
    if (authorsBlogs[atr] > blogs && blogs !== 0) {
      author = atr
      blogs = authorsBlogs[atr]
    }
  }
  return { author, blogs }
}

const mostLikes = (blogz) => {
  var authors = []
  var authorsLikes = []
  let authorsLikesSum = []
  let maxLikes = 0
  let maxLikesAuthor = ''

  if (blogz === []) {
    return ''
  }

  blogz.map(blog => {
    if (authors.indexOf(blog.author) === -1) {
      authors.push(blog.author)
    }
  })

  blogz.map(blog => {
    authorsLikes.push( {
      [blog.author]: blog.likes
    })
  })
  for (const atr in authors) {
    authorsLikesSum.push( {
      [authors[atr]]: _.sumBy(authorsLikes, authors[atr])
    })
  }

  authorsLikesSum.map(adr => {
    for (const property in adr) {
      if (maxLikes === 0) {
        maxLikes = adr[property]
        maxLikesAuthor = adr
      }
      if (adr[property] > maxLikes && maxLikes !== 0) {
        maxLikes = adr[property]
        maxLikesAuthor = adr
      }
    }
  })
  return maxLikesAuthor
}

const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
  obj[e] = (obj[e] || 0) + 1
  return obj
}, {})

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}