import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      return state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
  },
})

export const { appendBlog, setBlog } = blogReducer.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = (blogInfo) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogInfo)
    dispatch(appendBlog(newBlog))
  }
}

export default blogReducer.reducer
