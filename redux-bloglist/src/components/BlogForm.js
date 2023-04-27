import { useState } from 'react'
import { createBlog } from '../reducer/blogReducer'
import { useDispatch } from 'react-redux'
import { updateNotification } from '../reducer/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogInfo = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    dispatch(createBlog(blogInfo))
    dispatch(updateNotification(`${blogInfo.title} created!`, 'success', 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
            placeholder='write blog title here'
            id='blogtitle'
            name='title'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            name='author'
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
            placeholder='write blog author here'
            id='blogauthor'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            name='url'
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
            placeholder='write url here'
            id='blogurl'
          />
        </div>
        <button type='submit' id='create'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
