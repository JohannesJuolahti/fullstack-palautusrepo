import React from 'react'

const Person = ({ person, handleClickWithConfirm }) => {
  return (
    <div>
      {person.name} {person.number}  <button onClick={handleClickWithConfirm}>Delete</button>
    </div>
  )
}

export default Person
