import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'

const Comments = ({ blog }) => {
  const comments = blog.comments
  const queryClient = useQueryClient()
  const [commentText, setCommentText] = useState('')
  const newCommentMutation = useMutation(blogService.addComment, {
    onSuccess: () => queryClient.invalidateQueries('blogs'),
  })

  const addComment = async (event) => {
    event.preventDefault()
    newCommentMutation.mutate({
      blog,
      comment: commentText,
    })
    setCommentText('')
  }

  return (
    <>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input
          type='text'
          placeholder='add some comments to the blog'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type='submit'>Comment!</button>
      </form>
      {comments &&
        comments.map((comment) => (
          <ul key={comment}>
            <li>{comment}</li>
          </ul>
        ))}
    </>
  )
}

const BlogDetail = ({ blog }) => {
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        <span>{blog.likes} likes</span>
        <button>like</button>
      </p>
      <p>added by {blog.author}</p>
      <Comments blog={blog} />
    </div>
  )
}

export default BlogDetail
