import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', key: 'Arto Hellas'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [showAll, setShowAll] = useState(true)

  const namesToShow = showAll ? persons : persons.filter()

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      key: newName,
      name: newName
    }

    let names = []
    persons.map(person =>
      names.push(person.name))
    
    names.indexOf(newName) === -1 ? setPersons(persons.concat(personObject)) 
    : window.alert(`${newName} has already been added to phonebok`)
  
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/> 
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(person =>
          <Person key={person.name} person={person}/>
        )}
      </ul>
    </div>
  )

}

export default App