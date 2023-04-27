const Notification = ({ info }) => {
  if (!info.message) {
    return null
  }

  return (
    <div
      className={`info ${info.type === 'error' ? 'error' : 'success'}`}
    >
      <p>{info.message}</p>
    </div>
  )
}

export default Notification
