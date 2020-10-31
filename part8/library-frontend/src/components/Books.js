import React, { useEffect, useState } from 'react'
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import Genres from './Genres'

const Books = ({ show, genreToShow }) => {
  const [genre, setGenre] = useState(null)
  const [getAllBooks, result] = useLazyQuery(ALL_BOOKS)
  const allBooksResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    setGenre(genreToShow);
  }, [genreToShow]);

  useEffect(() => {
    if (genre) {
      getAllBooks({ variables: { genre: genre } })
    } else {
      getAllBooks()
    }
  }, [genre]) // eslint-disable-line 

  const setNewGenre = (newGenre) => {
    client.cache.evict({ fieldName: 'allBooks', args: { genre: genre } })
    setGenre(newGenre)
  }

  if (!show) {
    return null
  }

  if (result.loading || allBooksResult.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {genreToShow
        ? <h2>Recommendations</h2>
        : <h2>Books</h2>
      }
      {genreToShow
        ? <h3>Books in your favorite genre '{genreToShow}'</h3>
        : (genre ? <h3>In genre '{genre}'</h3> : <h3>All genres</h3>)
      }
      <div>
        <table>
          <tbody>
            <tr>
              <th>
                Title
              </th>
              <th>
                Author
              </th>
              <th>
                Published Year
              </th>
              <th>
                Genres
              </th>
            </tr>
            {result.data.allBooks.map(b =>
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                <td>{b.genres.join(', ')}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {genreToShow ? null : <Genres setGenre={setNewGenre} />}
    </div>
  )
}

export default Books