import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const VoteSituation = (props) => {
  return (
    <div>
      {props.has} placeholder {props.votes}
    </div>
    )
  }

const getRandomInt = (anecdotes) => {
  return Math.floor(Math.random() * anecdotes.length)
}

const voteAnAnec = (anecdotes, selected, points) => {
  const copy = { ...points }

  let rightIndex = anecdotes.indexOf(anecdotes[selected])
  copy[rightIndex] += 1
  console.log(copy)
  return copy
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const has = "has"
  const votes = "votes"
   
  const [selected, setSelected] = useState(0)
  //const [votedAnec, setVoted] = useState(0)

  //const points = Array(anecdotes.length).fill(0)

  return (
    <div>
      {anecdotes[selected]}
      <br></br>
      <Button handleClick={() => setSelected(getRandomInt(anecdotes))} text={"next anecdote"} />
    </div>
  )
}

export default App