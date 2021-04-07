import React from 'react'

const Header = (props) => {
  return (
    <div>
        <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
        <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  console.log(props.part1['name'])
  return (
    <div>
        <Part part={props.part1['name']} exercises={props.part1['exercises']}/>
        <Part part={props.part2['name']} exercises={props.part2['exercises']}/>
        <Part part={props.part3['name']} exercises={props.part3['exercises']}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
        <p>{props.total}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const sum=part1.exercises + part2.exercises + part3.exercises
  const total_text= 'Number of exercises ' + sum

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total total={total_text}/>
    </div>
  )
}

export default App