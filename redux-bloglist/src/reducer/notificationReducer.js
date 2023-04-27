import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducer: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer

export const updateNotification = (info, status, seconds) => {
  return (dispatch) => {
    dispatch(setNotification(info, status))
    setTimeout(() => removeNotification(), seconds * 1000)
  }
}
