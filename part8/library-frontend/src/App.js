import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import { ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [getCurrentUser, currentUserResult] = useLazyQuery(CURRENT_USER, { fetchPolicy: "network-only" })
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!dataInStore.allBooks.map(b => b.id).includes(addedBook.id)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

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
  }, [currentUserResult.data])

  const setNewToken = (newToken) => {
    setToken(newToken)
    localStorage.setItem('libraryapp-user-token', newToken)
    setPage('books')
    getCurrentUser()
  }

  const logout = () => {
    setToken(null)
    localStorage.clear('libraryapp-user-token')
    setPage('books')
    setUser(null)
  }

  const handleBookAdded = () => {
    setPage('books')
  }

  return (
    <div>
      <div>{errorMessage}</div>

      <div>
        <button onClick={() => setPage('books')}>Books</button>
        <button onClick={() => setPage('authors')}>Authors</button>
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
        show={page === 'add'} setError={notify} handleBookAdded={handleBookAdded}
      />

      <LoginForm
        show={page === 'login'} setError={notify} setNewToken={setNewToken}
      />

    </div>
  )
}

export default App