// eslint-disable-next-line no-unused-vars
const { response } = require('express')
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
morgan.token('person', (request) => {
  return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.set('view engine', 'pug')


// TODO: Haetaanko liikaa kannasta aina kaikki nimet ja numerot?


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

function generateId(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (request, response, next) => {
  Person.find({}).then(persons => {
    const timeStamp = 'Information fetched from db at ' + new Date().toISOString() + ' (UTC)'
    response.render('info', { size: String(persons.length), timeStamp: timeStamp })
  })
    .catch(error => {
      next(error)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const names = []
  var persons = []

  Person.find({}).then(people => {
    persons = people
  })

  const person = new Person({
    id: generateId(5, 60000),
    name: body.name,
    number: body.number
  })

  persons.map(person => {
    names.push(person.name)
  })

  if (body.name && body.number) {
    if (!names.includes(body.name)) {
      persons = persons.concat(person)
      person.save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
        .catch(error => {
          next(error)
        })
    } else {
      return response.status(400).json({
        error: 'person already added to phonebook'
      })
    }
  } else {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
})

app.delete('/api/persons/delete/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

