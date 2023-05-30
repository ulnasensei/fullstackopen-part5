import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const [displayDetails, setDisplayDetails] = useState(false)

  const handleDelete = () => {
    if (window.confirm(`Deleting post "${blog.title}."`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div
      style={{
        border: '1px solid black',
        margin: '0.1rem',
        padding: '0.3rem',
      }}
    >
      {blog.title} by {blog.author}{' '}
      <button onClick={() => setDisplayDetails((current) => !current)}>
        {displayDetails ? 'Hide' : 'View'}
      </button>
      {displayDetails && (
        <>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}{' '}
          <button
            onClick={() => updateBlog(blog.id, { likes: blog.likes + 1 })}
          >
            Like
          </button>
          <br />
          Posted by: {blog.user.name}
          <br />
          {user.username === blog.user.username && <button onClick={handleDelete}>Remove</button>}
        </>
      )}
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
