const Notification = ({ message, isError }) => {
  let classNm = isError ? 'error' : 'successMessage'
  if (message === null) {
    return null
  }

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div className={classNm}>
      {message}
    </div>
  )
}

export default Notification