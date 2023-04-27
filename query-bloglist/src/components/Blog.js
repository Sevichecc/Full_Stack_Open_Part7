import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, canRemove }) => {
  const [visible, setVisibility] = useState(false)

  const removeBtnStyle = {
    backgroundColor: 'blue',
    color: 'white',
  }

  return (
    <div className='blog'>
      <span>{blog.title}</span>
      <button onClick={() => setVisibility(!visible)} id='visibility'>
        {visible ? 'hide' : 'view'}
      </button>
      {visible && (
        <div>
          <a href={blog.url} className='url'>
            {blog.url}
          </a>
          <div className='likes'>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)} id='like'>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {canRemove && (
            <button
              id='remove'
              style={removeBtnStyle}
              onClick={() => handleRemove(blog)}
            >
              delelte
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
