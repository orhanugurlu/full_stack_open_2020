import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { CURRENT_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [getCurrentUser, currentUserResult] = useLazyQuery(CURRENT_USER, { fetchPolicy: "network-only" })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    const token = localStorage.getItem('libraryapp-user-token')
    if (token) {
      setToken(token)
      getCurrentUser()
    }
  }, []) // eslint-disable-line 

  useEffect(() => {
    if (currentUserResult.data) {
      setUser(currentUserResult.data.me)
    }
  }, [currentUserResult.data]) // eslint-disable-line 

  const setNewToken = (newToken) => {
    setToken(newToken)
    localStorage.setItem('libraryapp-user-token', newToken)
    setPage('authors')
    getCurrentUser()
  }

  const logout = () => {
    setToken(null)
    localStorage.clear('libraryapp-user-token')
    setPage('authors')
    setUser(null)
  }

  return (
    <div>
      <div>{errorMessage}</div>

      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {token ? <button onClick={() => setPage('add')}>Add Book</button>
          : null}
        {token ? <button onClick={() => setPage('recommend')}>Recommend</button>
          : null}
        {token ? <button onClick={() => logout()}>Logout</button>
          : <button onClick={() => setPage('login')}>Login</button>}
      </div>

      <Authors
        show={page === 'authors'} setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <Books
        show={page === 'recommend'}
        genreToShow={user ? user.favoriteGenre : null}
      />

      <NewBook
        show={page === 'add'} setError={notify}
      />

      <LoginForm
        show={page === 'login'} setError={notify} setNewToken={setNewToken}
      />

    </div>
  )
}

export default App