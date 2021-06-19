import React from 'react'

const Person = ({ person, handleClickWithConfirm }) => {
  return (
    <div>
      {person.name} {person.number}  <button onClick={handleClickWithConfirm}>Delete</button>
    </div>
  )
}
// <button onClick={() => handleClickWithConfirm(person.name, person.id)}>{'delete'}</button>
export default Person
