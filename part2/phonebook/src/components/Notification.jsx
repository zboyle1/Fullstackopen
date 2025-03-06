const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  const cssClass = type ? 'error' : 'notification'
  return (
    <div className={cssClass}>
      {message}
    </div>
  )
}

export default Notification