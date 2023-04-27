import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state)

  return (
    notification.info && (
      <div
        className={`info ${
          notification.status === 'error' ? 'error' : 'success'
        }`}
      >
        <p>{notification.info}</p>
      </div>
    )
  )
}

export default Notification
