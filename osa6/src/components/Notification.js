
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (props.notification !== 'INIT') {
    return (
      <div style={style}>
        {props.notification}
      </div>
      )
  } else { 
    return null 
  }
}

const mapStateToProps = (state) => {
  if ( state.notification !== 'INIT' ) {
    return {
      notification: state.notification
    }
   } else {
      return {
        notification: 'INIT'
      }
  }
}

export default connect(
  mapStateToProps
)(Notification)