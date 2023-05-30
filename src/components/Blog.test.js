import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jester',
    url: 'https://example.com',
    likes: 12
  }

  const { container } = render(<Blog blog={blog} />)

  const simpleView = container.querySelector('.blog-simple')
  const detailedView = container.querySelector('.blog-details')
  expect(simpleView).toBeDefined()
  expect(detailedView).toBeNull()
})