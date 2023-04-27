import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlog(state, action) {
      return action.payload
    },
    addLike(state, action) {
      const blog = state.find((a) => a.id === action.payload.id)
      if (blog) {
        blog.likes += 1
      }
    },
    removeBlog(state, action) {
      const index = state.findIndex((a) => a.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const { appendBlog, setBlog, addLike, removeBlog } = blogReducer.actions

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

export const incrementLike = (blog) => {
  return async (dispatch) => {
    await blogService.addLike(blog)
    dispatch(addLike(blog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogReducer.reducer
