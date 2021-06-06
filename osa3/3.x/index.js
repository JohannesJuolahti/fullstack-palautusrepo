const { response } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
app.set('view engine', 'pug')


let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456",
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345",
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
      }
  ]

  function generateId(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    const sizeOfPersons = persons.length
    const timeStamp = new Date().toISOString() + " (UTC)"
    response.render('info', { size: sizeOfPersons, timeStamp: timeStamp})
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }

  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    const person = {
      id: generateId(5, 60000),
      name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  app.delete('/api/persons/delete/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

