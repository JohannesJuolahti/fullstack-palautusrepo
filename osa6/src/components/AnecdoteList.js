import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, hideNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                Has {anecdote.votes}
                <button onClick={handleClick}>Vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter  === 'ALL'
          ? anecdotes
          : anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      })
    
    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote 
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => 
                    { dispatch(voteAnecdote(anecdote.id))
                    dispatch(notificationChange(`You voted '${anecdote.content}'.`, 5))
                    }
                }
                />
            )}
        </div>
    )
}

export default AnecdoteList