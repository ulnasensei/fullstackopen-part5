import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Blog Form works', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jester',
    url: 'https://example.com',
  }

  const { container } = render(<BlogForm createBlog={mockHandler} />)

  const titleElement = container.querySelector('#title')
  const authorElement = container.querySelector('#author')
  const urlElement = container.querySelector('#url')
  const submitBtn = container.querySelector('#submit-btn')

  await user.type(titleElement, blog.title)
  await user.type(authorElement, blog.author)
  await user.type(urlElement, blog.url)
  await user.click(submitBtn)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe(blog.title)
  expect(mockHandler.mock.calls[0][1]).toBe(blog.author)
  expect(mockHandler.mock.calls[0][2]).toBe(blog.url)

})
