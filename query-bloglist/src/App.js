import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import { useNotify } from './context/NotificationContext'
const App = () => {
  const dispatch = useNotify()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch({
        type: 'SET',
        message: 'Wrong username or password',
        status: 'error',
      })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisbility()
      dispatch({
        type: 'SET',
        message: `a new blog ${newBlog.title} by ${newBlog.author}`,
        status: 'success',
      })
    } catch (error) {
      dispatch({
        type: 'SET',
        message: error.message,
        status: 'error',
      })
    }
  }

  const addLike = async (blogObject) => {
    try {
      const response = await blogService.addLike(blogObject)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === response.id ? response : blog
      )
      setBlogs(updatedBlogs)
    } catch (error) {
      dispatch({
        type: 'SET',
        message: error.message,
        status: 'error',
      })
    }
  }

  const removeBlog = async (blogObject) => {
    try {
      if (
        !window.confirm(
          `Remove blog ${blogObject.title}! by Ron ${blogObject.author}`
        )
      )
        return
      await blogService.remove(blogObject)
      const updatedBlog = blogs.filter((blog) => blog.id !== blogObject.id)
      setBlogs(updatedBlog)
    } catch (error) {
      dispatch({
        type: 'SET',
        message: error.message,
        status: 'error',
      })
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
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={addLike}
            handleRemove={removeBlog}
            canRemove={user && blog.user.username === user.username}
          />
        ))}
    </div>
  )
}

export default App
