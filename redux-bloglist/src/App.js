import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { updateNotification } from './reducer/notificationReducer'
import {
  initializeBlogs,
  incrementLike,
  deleteBlog,
} from './reducer/blogReducer'
import { loginUser, logoutUser } from './reducer/userReducer'
const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(updateNotification('Wrong username or password', 'error', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title}! by Ron ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <span>{user.username} logged in </span>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
      {blogs &&
        [...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={() => {
                return dispatch(incrementLike(blog))
              }}
              handleRemove={handleRemoveBlog}
              canRemove={user && blog.user.username === user.username}
            />
          ))}
    </div>
  )
}

export default App
