import React from 'react'
import personService from '../services/person'

const handleClickWithConfirm = (personName, personId) => {
  let result = false
  result = window.confirm(`Are you sure you want to delete ${personName}?`);
  if (result) {
    personService
    .del(personId)
  }
}

const Person = ({ person }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => handleClickWithConfirm(person.name, person.id)}>{'delete'}</button>
    </div>
  )
}

export default Person
