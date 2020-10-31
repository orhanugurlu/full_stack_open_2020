import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirthYearForm from './SetBirthYearForm'

const Authors = ({ show, setError }) => {
  const result = useQuery(ALL_AUTHORS)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              Name
            </th>
            <th>
              Birth Year
            </th>
            <th>
              Books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {result.data.allAuthors.length > 0
        ? <SetBirthYearForm setError={setError} authors={result.data.allAuthors} />
        : null}
    </div>
  )
}

export default Authors
