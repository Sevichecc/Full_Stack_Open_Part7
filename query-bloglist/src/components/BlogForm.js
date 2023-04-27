import { useState } from 'react'
import { useNotify } from '../context/NotificationContext'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'

const BlogForm = () => {
  const dispatch = useNotify()
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: () => queryClient.invalidateQueries('blogs'),
    onError: (error) => dispatch({ type: 'SET', message: error.response.data.message })
  })
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    newBlogMutation.mutate({
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
