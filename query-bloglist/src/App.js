import { useState, useEffect } from 'react'
import { useUserValue, useUserDispatch } from './context/UserContext'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'

import UserBlogs from './components/UserBlogs'
import BlogList from './components/BlogList'

import { login } from './services/login'
import blogService from './services/blogs'

import { useNotify } from './context/NotificationContext'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  const dispatch = useNotify()

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

  const handleLogin = async () => {
    try {
      const user = await login({ username, password })

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
    <Router>
      <h2>blogs</h2>
      <Notification />
      <p>{user.username} logged in </p>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path='/users' element={<UserBlogs />} />
        <Route path='/' element={<BlogList />} />
      </Routes>
    </Router>
  )
}

export default App
