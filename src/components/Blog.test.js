import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Jester',
  url: 'https://example.com',
  likes: 12,
  user: { name: 'test user', username: 'test_username' },
}

const userData = { name: 'test user', username: 'test_username' }

test('renders content', () => {
  const { container } = render(<Blog blog={blog} />)

  const simpleView = container.querySelector('.blog-simple')
  const detailedView = container.querySelector('.blog-details')
  expect(simpleView).toBeDefined()
  expect(detailedView).toBeNull()
})

test('details are shown when show button is clicked', async () => {
  const { container } = render(<Blog blog={blog} user={userData} />)

  const user = userEvent.setup()
  const button = container.querySelector('.blog-toggle-btn')

  await user.click(button)

  const detailedView = container.querySelector('.blog-details')

  expect(detailedView).toBeDefined()
})

test('event handler for like button works', async () => {
  const mockHandler = jest.fn()
  const { container } = render(
    <Blog blog={blog} user={userData} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const toggleButton = container.querySelector('.blog-toggle-btn')
  await user.click(toggleButton)

  const likeButton = container.querySelector('.blog-likes-btn')

  for(let i = 0; i < 2; i++) await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
