import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) => {
  return (
    <div>
      <p>{props.anecdote}</p>
      <p>{props.has} {props.voteAmount || 0} {props.votes}</p>
    </div>
    )
  }

  const Header = (props) => {
    return (
      <div>
        <h1>{props.header}</h1>
      </div>
      )
    }

const getRandomInt = (anecdotes) => {
  return Math.floor(Math.random() * anecdotes.length)
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
  const votes_text = "votes"
  const anecdote_of_the_day = "Anecdote of the day"
  const most_votes_text = "Anecdote with most votes"
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([])

  const handleVotingClick = () => {
    setVotes(previousVotes => {
        const copy = [...previousVotes];
        copy[selected] = (copy[selected] || 0) + 1;
        setVotes(copy); 
        return (
          copy
        )
        })
  }

let maxVotes = Math.max(...votes)
console.log("Max votes ", maxVotes)
let MaxVoteAnecdote = votes.indexOf(maxVotes)
console.log("Max votes anecdote ", MaxVoteAnecdote)

  return (
    <div>
      <Header header={anecdote_of_the_day} />
      <Display has={has} anecdote={anecdotes[selected]} voteAmount={votes[selected]} votes={votes_text}/>
      <Button handleClick={handleVotingClick} text={"vote"} />
      <Button handleClick={() => setSelected(getRandomInt(anecdotes))} text={"next anecdote"} />
      <Header header={most_votes_text} />
      <Display has={has} anecdote={anecdotes[MaxVoteAnecdote]} voteAmount={maxVotes} votes={votes_text} />
    </div>
  )
}

export default App
