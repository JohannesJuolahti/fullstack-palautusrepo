import React from 'react'
 
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(notificationChange(`You created anecdote '${content}'.`, 5))
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addAnecdote}>
                    <div>
                        <input name="anecdote" />
                    </div>
                <button type="submit">create</button>
            </form>
        </div>
      )
}

export default AnecdoteForm
