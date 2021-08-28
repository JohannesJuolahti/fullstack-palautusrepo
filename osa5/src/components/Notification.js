const Notification = ({ message, isError }) => {
    let classNm = isError ? "error" : "successMessage"
    if (message === null) {
      return null
    }
  
    return (
      <div className={classNm}>
        {message}
      </div>
    )
  }
  
  export default Notification