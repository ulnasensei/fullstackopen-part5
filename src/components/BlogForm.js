import { useState } from 'react'

function BlogForm({ createBlog }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  return (
    <form onSubmit={(event) => {
      event.preventDefault()
      createBlog(title, author, url)}}>
      <label htmlFor="title">Title: </label>
      <input
        type="text"
        id="title"
        required
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      <label htmlFor="author">Author: </label>
      <input
        type="text"
        id="author"
        required
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      <label htmlFor="url">URL: </label>
      <input
        type="text"
        id="url"
        required
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit">Post</button>
    </form>
  )
}

export default BlogForm
