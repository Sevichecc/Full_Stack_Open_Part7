import { useState, useEffect } from 'react'
import { useUserValue, useUserDispatch } from './context/UserContext'
import { Routes, Route, useMatch } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UsersBlogList from './components/UsersBlogList'
import UserBlog from './components/UserBlog'
import BlogList from './components/BlogList'

import { login } from './services/login'
import blogService from './services/blogs'

import { useNotify } from './context/NotificationContext'
import { useQuery } from 'react-query'
import { getUsers } from './services/user'

const App = () => {
  const dispatch = useNotify()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = useUserValue()
  const userDispatch = useUserDispatch()

  const userResult = useQuery('users', getUsers, {
    refetchOnWindowFocus: false,
  })
  const users = userResult.data
  const match = useMatch('/users/:id')
  const user = users && match
    ? users.find((user) => user.id === match.params.id)
    : null

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const loginUser = JSON.parse(loggedUserJson)
      userDispatch({ type: 'SET', payload: loginUser })
      blogService.setToken(loginUser.token)
    }
  }, [userDispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loginUser)
      )
      blogService.setToken(loginUser.token)
      userDispatch({ type: 'SET', payload: loginUser })
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

  if (!loginUser) {
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
    <>
      <h2>blogs</h2>
      <Notification />
      <p>{loginUser.username} logged in </p>
      <button onClick={handleLogout}>logout</button>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<UsersBlogList users={users} />} />
        <Route path='/users/:id' element={<UserBlog user={user} />} />
      </Routes>
    </>
  )
}

export default App
