const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const save = process.argv.length > 3
const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.ia00v.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: {
      type: String,
      minlength: 3,
      unique: true,
      required: true
  },
  number: {
      type: String,
      minlength: 10,
      required: true
  },
})
personSchema.plugin(uniqueValidator)
const Person = mongoose.model('Person', personSchema)


if (save) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(result => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
}
