import React, { useState } from 'react'

const PersonForm = ({ persons, setPersons }) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
  
    const addEntry = (event) => {
      event.preventDefault()
      if (persons.some(e => e.name === newName)) {
        alert('{newName} is already added to phonebook')
      } else {
        setPersons(persons.concat({name : newName, number : newNumber}))
        setNewName('')
        setNewNumber('')
      }
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }  
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }  
  
    return (
        <form onSubmit={addEntry}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm