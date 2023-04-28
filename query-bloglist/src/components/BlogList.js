import React from 'react'
import { useQueryClient,useMutation } from 'react-query'
import { useUserValue } from '../context/UserContext'

import blogService from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = ({ blogs }) => {
  const user = useUserValue()
  const queryClient = useQueryClient()

  const updatedBlogAndMutation = useMutation(blogService.addLike, {
    onSuccess: () => queryClient.invalidateQueries('blogs'),
  })

  const handleLike = (blog) => {
    updatedBlogAndMutation.mutate(blog)
  }

  const removeBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => queryClient.invalidateQueries('blogs'),
  })

  const handleRemove = (blog) => {
    if (!window.confirm(`Remove blog ${blog.title}! by Ron ${blog.author}`))
      return
    removeBlogMutation.mutate(blog)
  }

  return (
    <div>
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
      {blogs &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              canRemove={user && blog.user.username === user.username}
            />
          ))}
    </div>
  )
}

export default BlogList
