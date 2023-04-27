import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const mockBlog = {
  title: 'Test Blog',
  author: 'John Doe',
  url: 'https://test-blog.com',
  likes: 5,
}

describe('<Blog />', () => {
  test('renders title and author but not url and likes by default', () => {
    render(<Blog blog={mockBlog} />)

    expect(screen.getByText(mockBlog.title)).toBeDefined()

    expect(screen.queryByTestId('url')).toBeNull()
    expect(screen.queryByTestId('likes')).toBeNull()
  })

  test('shows url and likes when view button is clicked', async () => {
    render(<Blog blog={mockBlog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByTestId('url')).toBeDefined()
    expect(screen.queryByTestId('likes')).toBeDefined()
  })

  test('the like button is clicked twice, the event handler is called twice', async () => {
    const handleLike = jest.fn()
    render(<Blog blog={mockBlog} handleLike={handleLike} />)

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
