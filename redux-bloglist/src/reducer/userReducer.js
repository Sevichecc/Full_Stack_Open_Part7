import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await login(credentials)
    dispatch(setUser(user))
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }
}
