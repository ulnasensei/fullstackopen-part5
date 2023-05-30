import { useState } from 'react'
import PropTypes from 'prop-types'
import './Blog.css'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Deleting post "${blog.title}."`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className='blog'>
      <div className='blog-simple'><span className='blog-title'>{blog.title}</span> by <span className='blog-author'>{blog.author}</span>{' '}
        <button className='blog-toggle-btn' onClick={() => setDisplayDetails((current) => !current)}>
          {displayDetails ? 'Hide' : 'View'}
        </button></div>

      {displayDetails && (
        <div className='blog-details'>
          <br />
          <span className='blog-url'>{blog.url}</span>
          <br />
          <span className='blog-likes'>likes {blog.likes}</span>{' '}
          <button
            className='blog-likes-btn' onClick={() => updateBlog(blog.id, { likes: blog.likes + 1 })}
          >
            Like
          </button>
          <br />
          <span className='blog-post-user'>Posted by: {blog.user.name}</span>
          <br />
          {user.username === blog.user.username && <button className='blog-remove-btn' onClick={handleDelete}>Remove</button>}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object,
  blog: PropTypes.object,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func
}

export default Blog
