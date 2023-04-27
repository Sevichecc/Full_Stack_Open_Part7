import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducer/notificationReducer'
import blogReducer from './reducer/blogReducer'
import userReducer from './reducer/userReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

export default store
