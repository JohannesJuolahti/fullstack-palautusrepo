import React from 'react'

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  var excersizes = []
  let sum = 0
  const reducer = (accumulator, currentValue) => accumulator + currentValue

  course.parts.map(part =>
    excersizes.push(part.exercises))
  
  sum = excersizes.reduce(reducer)

  return (
    <p><b>Total of {sum} exercises</b></p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      <ul>
        {course.parts.map(part => 
          <li key={part.id}>
            <Part name={part.name} exercises={part.exercises} />
          </li>
        )}
      </ul>
          <Total course={course} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>    
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const App = (props) => {
  const { courses } = props

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course course={course} key={course.id} />
      )}
    </div>
  )
}


export default App