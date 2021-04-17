import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', key: 'Arto Hellas', number: '0501234567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState(true)

  const personsToShow = showAll ? persons : persons.filter()

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const personObject = {
      key: newName,
      name: newName,
      number: newNumber
    }

    let names = []

    persons.map(person =>
      names.push(person.name))
    names.indexOf(newName) === -1 ? setPersons(persons.concat(personObject)) 
    : window.alert(`${newName} has already been added to phonebok`)

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNameAndNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> 
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/> 
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.name} person={person}/>
        )}
      </ul>
    </div>
  )

}

export default App