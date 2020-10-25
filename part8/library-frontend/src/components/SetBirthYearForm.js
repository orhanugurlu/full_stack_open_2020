import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const SetBirthYearForm = ({ authors, setError }) => {
  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error)
      setError(error.message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, born } })

    setBorn('')
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <select onChange={handleChange} value={name}>
            {authors.map(a =>
              <option key={a.id} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          phone <input
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default SetBirthYearForm