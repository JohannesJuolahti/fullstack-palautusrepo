import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/person'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [showAll] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const personsToShow = showAll ? persons : persons.filter(person => 
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const personObject = {
      key: newName,
      name: newName,
      number: newNumber
    }

    let names = []
    let updateNumber = false

    persons.map(person =>
      names.push(person.name))

    names.indexOf(newName) === -1 ? 
    personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
      })
    : updateNumber = window.confirm(`${newName} has already been added to the phonebook. Replace the old number with a new one?`)
    
    if (updateNumber) {
    personService
      .update(names.indexOf(newName) + 1, {'name': newName, 'number': newNumber})
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      
      <h3>Add a new</h3>

      <PersonForm addNameAndNumber={addNameAndNumber} 
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow}/>
      
    </div>
  )

}

export default App