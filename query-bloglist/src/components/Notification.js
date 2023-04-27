import { useNotificationValue } from '../context/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  return (
    notification && (
      <div className={`info ${notification.status}`}>
        <p>{notification.message}</p>
      </div>
    )
  )
}

export default Notification
