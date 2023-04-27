import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { updateNotification } from './reducer/notificationReducer'
import { initializeBlogs } from './reducer/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      dispatch(updateNotification('Wrong username or password', 'error', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // const addBlog = async (blogObject) => {
  //   try {
  //     const newBlog = await blogService.create(blogObject)
  //     setBlogs(blogs.concat(newBlog))
  //     blogFormRef.current.toggleVisbility()
  //     dispatch(
  //       updateNotification(
  //         `a new blog ${newBlog.title} by ${newBlog.author}`,
  //         'success',
  //         5
  //       )
  //     )
  //   } catch (error) {
  //     dispatch(updateNotification(error.message, 'error', 5))
  //   }
  // }

  const addLike = async (blogObject) => {
    try {
      const response = await blogService.addLike(blogObject)
      const updatedBlogs = blogs.map((blog) =>
        blog.id === response.id ? response : blog
      )
      setBlogs(updatedBlogs)
    } catch (error) {
      dispatch(updateNotification(error.message, 'error', 5))
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
      dispatch(updateNotification(error.message, 'error', 5))
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
        <BlogForm />
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
