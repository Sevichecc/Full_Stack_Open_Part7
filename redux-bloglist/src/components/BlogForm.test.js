import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

const mockBlog = {
  title: 'Test Blog',
  author: 'John Doe',
  url: 'https://test-blog.com',
}

test('<BlogForm />', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write blog title here')
  const authorInput = screen.getByPlaceholderText('write blog author here')
  const urlInput = screen.getByPlaceholderText('write url here')

  await user.type(titleInput, mockBlog.title)
  await user.type(authorInput, mockBlog.author)
  await user.type(urlInput, mockBlog.url)

  await user.click(screen.getByText('create'))

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(mockBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(mockBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(mockBlog.url)
})
