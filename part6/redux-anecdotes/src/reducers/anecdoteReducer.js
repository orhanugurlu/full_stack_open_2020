import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE': {
      const updatedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      ).sort((a, b) => b.votes - a.votes)
    }
    case 'CREATE': {
      return [...state, action.data]
    }
    case 'INIT':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}

export const updateAnecdote = (anecdote) => {
  return async dispatch => {
    const data = await anecdoteService.update(anecdote)
    dispatch({
      type: 'UPDATE',
      data
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const data = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      data
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
  }
}

export default reducer