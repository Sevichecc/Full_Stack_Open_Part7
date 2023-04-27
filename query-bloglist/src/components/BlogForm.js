import { useState } from 'react'
import { useNotify } from '../context/NotificationContext'

const BlogForm = ({ createBlog }) => {
  const dispatch = useNotify()
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })
    dispatch({
      type: 'SET',
      message: `${blogTitle} created!`,
      status: 'success',
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
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
          />
        </div>
        <div>
          author:
          <input
            type='text'
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
