import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import loginService from './services/login'
import { useNotify } from './context/NotificationContext'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from './services/blogs'
import { useUserValue, useUserDispatch } from './context/UserContext'

const App = () => {
  const dispatch = useNotify()
  const queryClient = useQueryClient()
  const blogResults = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
  })
  const blogs = blogResults.data

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useUserValue()
  const userDispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      userDispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET', payload: user })
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
    userDispatch({ type: 'REMOVE' })
  }
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

export default App
