import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [showAll] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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

    persons.map(person =>
      names.push(person.name))
    names.indexOf(newName) === -1 ? 
    axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
    }) 
    : window.alert(`${newName} has already been added to the phonebook.`)
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