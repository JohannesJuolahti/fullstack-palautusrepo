import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/person'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [showAll] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)


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

    if (names.indexOf(newName) === -1) {
      personService
        .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`${newName} added to the phonebook!`)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      } else {
        updateNumber = window.confirm(`${newName} has already been added to the phonebook. Replace the old number with a new one?`)
      }
    
    if (updateNumber) {
      var updatedPerson = persons[names.indexOf(newName)]
      var updatablePersonId = updatedPerson.id
      updatedPerson.number = newNumber
      console.log(updatedPerson)
      personService
        .update(updatablePersonId, {'name': newName, 'number': newNumber})
        
        setErrorMessage(`Number for ${newName} was succesfully changed!`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
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

  const handleClickWithConfirm = (personName, personId) => {
    let result = false
    result = window.confirm(`Are you sure you want to delete ${personName}?`);
    if (result) {
      personService.del(personId)
      setPersons(persons.filter(p => p.id !== personId))
    }
  }
  return (
    <div>
      <Notification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      
      <h3>Add a new</h3>

      <PersonForm addNameAndNumber={addNameAndNumber} 
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h3>Numbers</h3>
      
      {personsToShow.map(person =>
          <Person key={person.name} person={person} id = {person.id} 
          handleClickWithConfirm={() => handleClickWithConfirm(person.name, person.id)}/> 
        )}
      

    </div>
  )

}

export default App