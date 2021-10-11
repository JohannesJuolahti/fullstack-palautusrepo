const notificationReducer = (state = 'INIT', action) => {
    switch(action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'HIDE_NOTIFICATION':
        return 'INIT'
      default:
        return state
    }
  }
  
  export const notificationChange = (notification, seconds) => {
    var timeoutHandle = setTimeout(...notification, seconds)
    return async dispatch => {
      clearTimeout(timeoutHandle)
      timeoutHandle = setTimeout(() => {
        dispatch(hideNotification(`${notification}`))
      }, seconds * 1000)
      dispatch({
        type: 'SET_NOTIFICATION',
        notification,
      })
    }
}

export const hideNotification = (notification) => {
    return {
      type: 'HIDE_NOTIFICATION',
      notification,
    }
}

  export default notificationReducer