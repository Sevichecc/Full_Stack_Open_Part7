import { useContext, useReducer, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET':
    return { message: action.message, status: action.status }
  case 'CLEAR':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notifyAndDispatch = useContext(NotificationContext)
  return notifyAndDispatch[0]
}

export const useNotify = () => {
  const notifyAndDispatch = useContext(NotificationContext)
  const dispatch = notifyAndDispatch[1]
  return (info) => {
    dispatch({ type: 'SET', message: info.message, status: info.status })
    setTimeout(() => dispatch({ type: 'CLEAR' }), 5000)
  }
}

export default NotificationContext
