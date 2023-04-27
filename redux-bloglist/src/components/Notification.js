import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return (
    notification && (
      <div className={`info ${notification.status}`}>
        <p>{notification.info}</p>
      </div>
    )
  )
}

export default Notification
