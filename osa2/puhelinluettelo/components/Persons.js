import React from 'react'
import Person from './Person'

const Persons= (props) => {
  return (
    <div>
        {props.personsToShow.map(person =>
          <Person key={person.name} person={person}/>
        )}
    </div>
  )
}

export default Persons