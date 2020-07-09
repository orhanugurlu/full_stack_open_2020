import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState(null)

  const hook = () => {
    personService.getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  )
}

export default App